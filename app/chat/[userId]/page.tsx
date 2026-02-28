
"use client";

import Login from '@/app/_components/ui/login';
import useUserContext from '@/app/_customHooks/useUserContext';
import ChatHeader from '@/app/_features/chat/chatHeader';
import FailedToLoadFullChatState from '@/app/_features/chat/failedToLoadFullChatState';
import LoadingFullChatState from '@/app/_features/chat/loadingFullChatState';
import { IMessage } from '@/app/_features/chat/messageCard';
import MessagesContainer from '@/app/_features/chat/messagesContainer';
import NoMessagesYetState from '@/app/_features/chat/noMessagesYetState';
import SendMessageForm from '@/app/_features/chat/sendMessageForm';
import { IPaginationChat } from '@/app/_interfaces/IChatResponse';
import { IOtherUser } from '@/app/_interfaces/IOtherUser';
import { getConversationMessages, sendMessage, subscribeToConversation } from '@/app/_lib/services/chat';
import { supabase } from '@/app/_lib/supabase';
import { decryptMessage, encryptMessage } from '@/app/_utlis/crypto';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast';

export default function Page() {
  const [content, setContent] = useState<string>("");
  const { state } = useUserContext();
  const searchParams = useSearchParams();
  const params = useParams();
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [messagesPag, setMessagesPag] = useState<IPaginationChat | null>(null)
  const [page, setPage] = useState(0);
  const conv_id = searchParams.get("conv_id");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [initialMessagesRequestStatus, setInitialMessagesRequestStatus] = useState<'loading' | "success" | "error" | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bottomRefSecond = useRef<HTMLDivElement>(null);

  const other_user: IOtherUser = {
    email: searchParams.get("other_user_email") || "UNKNOWN",
    name: searchParams.get("other_user_name") || "UNKNOWN",
    avatarUrl: searchParams.get("other_user_avatar_url") || "",
    createdAt: searchParams.get("other_user_createdAt") || "",
    main_id: params.userId!.toString(),
  }

  useEffect(() => {
    document.getElementById("navbar")?.classList.add("hidden");
    document.getElementById("main")?.classList.remove("pt-18");
    document.body.classList.remove("body-style")

    return () => {
      document.getElementById("navbar")?.classList.remove("hidden")
      document.getElementById("main")?.classList.add("pt-18")
      document.body.classList.add("body-style")
    }
  }, []);

  useEffect(() => {
    if (!conv_id || !state.user?.main_id || state.loading) return;

    async function fetchMsgs() {
      setInitialMessagesRequestStatus('loading')

      try {
        const data = await getConversationMessages(conv_id!, 0);

        setMessages(data.data ?? []);

        setMessagesPag(data.pagination);

        setInitialMessagesRequestStatus('success')

      } catch {
        setInitialMessagesRequestStatus('error');

        return;
      }
    }

    fetchMsgs()


  }, [conv_id, state]);

  async function fetchMore() {
    if (!messagesPag?.hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      const data = await getConversationMessages(conv_id!, page + 1);

      setPage(prev => prev + 1);

      setMessages(prev => [...prev!, ...data.data]);

      setMessagesPag(data.pagination);
    } catch {
      toast.error("Failed to load oldest messages, tryagian later.");

      return;
    } finally {
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    if (!conv_id) return;

    const channel = subscribeToConversation(conv_id!, (newMessage) => {
      setMessages((prev) => {
        if (prev!.find((m) => m.id === newMessage.id)) return prev;

        return [{ ...newMessage, content: decryptMessage(newMessage.content) }, ...prev!,];
      });

      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      setTimeout(() => bottomRefSecond.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conv_id]);

  /* FORM EVENTS HANDLERS */
  async function handleFormSubmit() {

    if (!conv_id || !state?.user?.main_id || !content.trim() || !content) return;

    try {
      await sendMessage(conv_id, state.user.main_id, encryptMessage(content));

      setContent("");

    } catch {
      toast.error(`Failed to send this message ${content.length >= 7 ? content.slice(0, 7) + '...' : content}`);

      return;
    }
  }

  /* eslint-disable-next-line */
  function handleInputResize(e: any) {
    const el = e.target;

    el.style.height = "auto";

    const maxHeight = window.innerHeight * 0.20; // 20vh
    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
  }

  /* eslint-disable-next-line */
  function handleInputChange(e: any) {
    setContent(e.target.value)
  }

  if (state.loading || initialMessagesRequestStatus === 'loading') return (
    <div className="h-dvh flex flex-col justify-between items-center" >
      <LoadingFullChatState />
    </div>
  );

  if (!state.user?.main_id) return <Login />

  return (
    <div className="max-h-screen overflow-hidden flex flex-col justify-between items-center">
      <ChatHeader other_user={other_user} />

      {initialMessagesRequestStatus === 'error' && <FailedToLoadFullChatState />}

      {initialMessagesRequestStatus === 'success' && messages && messages.length === 0 && <NoMessagesYetState />}

      {messages && messages.length > 0 &&
        <MessagesContainer
          currentUserId={state.user.main_id}
          fetchMoreFn={fetchMore}
          messages={messages!}
          hasNextPage={messagesPag!.hasNextPage}
        />
      }

      <SendMessageForm
        content={content}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleInputResize={handleInputResize}
      />
    </div>
  )
}
