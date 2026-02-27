import { supabase } from "../supabase";

export async function searchUserByEmail(email: string, currentUserId: string) {
  const { data: myConversations } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .eq("user_id", currentUserId);

  const myConversationIds =
    myConversations?.map((c) => c.conversation_id) ?? [];

  const { data: existingMembers } = await supabase
    .from("conversation_members")
    .select("user_id")
    .in("conversation_id", myConversationIds)
    .neq("user_id", currentUserId);

  const alreadyChattingWith = existingMembers?.map((m) => m.user_id) ?? [];

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .neq("main_id", currentUserId)
    .not("main_id", "in", `(${alreadyChattingWith.join(",")})`)
    .single();

  if (error) {
    throw new Error("User not found or you already have a chat with them.");
  }

  console.log(data);

  return data;
}
