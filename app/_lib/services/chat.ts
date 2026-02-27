import { OtherUser } from "@/app/_interfaces/IMyChatsResponse";
import { supabase } from "@/app/_lib/supabase";
import { decryptMessage } from "@/app/_utlis/crypto";

// 1. CREATE-CONVERSATION
export async function createConversation(memberIds: string[]) {
  if (memberIds.length < 2) throw new Error("You need at least 2 members");

  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .insert({})
    .select("*")
    .single();

  if (convError || !conversation)
    throw convError || new Error("Failed to create conversation");

  const { error: membersError } = await supabase
    .from("conversation_members")
    .insert(
      memberIds.map((user_id) => ({
        conversation_id: conversation.id,
        user_id,
      })),
    );

  if (membersError) throw membersError;
    console.log(conversation)
  return conversation;
}

// 2. GET-USER-CONVERSATIONS-PAGINATED & LAST-MESSAGE-FOR-EVERY-CHAT. USING LAST IN FIRST OUT
export async function getUserConversationsPaginated(
  userId: string,
  page = 0,
  pageSize = 10,
) {
  const { data, count, error } = await supabase
    .from("conversations")
    .select(
      `
      *,
      conversation_members!inner(user_id),
      messages(*)
    `,
      { count: "exact" },
    )
    .eq("conversation_members.user_id", userId)
    .order("last_message_at", { ascending: false })
    .order("created_at", { ascending: false, foreignTable: "messages" })
    .limit(1, { foreignTable: "messages" })
    .range(page * pageSize, (page + 1) * pageSize - 1); 

  if (error) {
    throw new Error("Cannot load chats right now, tryagian later.");
  }

  if (data.length === 0) {
    return {
      data: [],
      pagination: {
        page: 0,
        pageSize: 0,
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  const unique_conversations_ids_array = Array.from(
    new Set(data?.map((chat) => chat.id)),
  );

  const current_user_id = data.at(0).conversation_members.at(0).user_id;

  const others_users = [];

  for (let i = 0; i < unique_conversations_ids_array.length; i++) {
    const { data, error } = await supabase
      .from("conversation_members")
      .select(`*`)
      .eq("conversation_id", unique_conversations_ids_array[i])
      .neq("user_id", current_user_id)
      .single();

    if (error) {
      throw new Error("Cannot load other users right now, tryagian later.");
    }

    others_users.push(data);
  }

  const profiles: OtherUser[] = [];

  for (let i = 0; i < others_users.length; i++) {
    const { data, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("main_id", others_users[i].user_id)
      .single();

    if (error) {
      throw new Error("Cannot load profiles right now, tryagian later.");
    }

    profiles.push({
      ...data,
      conversation_id: others_users[i].conversation_id,
    });
  }

  const formattedData = data.map((chat) => ({
    ...chat,
    /* eslint-disable-next-line */
    messages: chat.messages.map((msg: any) => ({
      ...msg,
      content: decryptMessage(msg.content),
    })),
    other_user: profiles.find(
      (profile) => profile.conversation_id === chat.id,
    ) || {
      main_id: "",
      createdAt: "",
      name: "",
      avatar_url: "",
      user_id: "",
      email: "",
      conversation_id: "",
    },
  }));

  const totalPages = Math.ceil((count || 0) / pageSize);

  console.log(formattedData);
  return {
    data: formattedData,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalItems: count || 0,
      hasNextPage: page + 1 < totalPages,
      hasPrevPage: page > 0,
    },
  };
}

// 3. GET-FULL-CHAT-PAGINATED. USING LAST IN FIRST OUT
export async function getConversationMessages(
  conversationId: string,
  page = 0,
  pageSize = 25,
) {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
    .from("messages")
    .select(
      `
        *,
        profiles!messages_sender_id_fkey(
          main_id,
          name,
          avatar_url,
          email
        )
      `,
      { count: "exact" },
    )
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error("Cannot load messages right now, try again later.");
  }

  let messages = data ?? [];

  const totalPages = Math.ceil((count || 0) / pageSize);

  if (messages.length > 0)
    messages = data.map((msg) => ({
      ...msg,
      content: decryptMessage(msg.content),
    }));

  if (messages.length === 0) {
    return {
      data: [],
      pagination: {
        page: 0,
        pageSize: 0,
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  return {
    data: messages,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalItems: count || 0,
      hasNextPage: page + 1 < totalPages,
      hasPrevPage: page > 0,
    },
  };
}

// 4. CHAT-CHANNEL, REALTIME CHAT.
export function subscribeToConversation(
  conversationId: string,
  /* eslint-disable-next-line */
  onNewMessage: (message: any) => void,
) {
  const channel = supabase
    .channel(`conversation:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      async (payload) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("main_id, name, avatar_url, email")
          .eq("main_id", payload.new.sender_id)
          .single();

        onNewMessage({
          ...payload.new,
          profiles: profile,
        });
      },
    )
    .subscribe();

  return channel;
}

// 5. SEND-MESSAGE
export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string,
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      content,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}
