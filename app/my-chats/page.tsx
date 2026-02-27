"use client";

import Login from "@/app/_components/ui/login";
import useUserContext from "@/app/_customHooks/useUserContext";
import LoadingFullChatState from "@/app/_features/chat/loadingFullChatState";
import ConvCard from '@/app/_features/my-chats/convCard';
import MyChatsHeader from '@/app/_features/my-chats/myChatsHeader';
import { IMyChatsResponse } from "@/app/_interfaces/IMyChatsResponse";
import { getUserConversationsPaginated } from '@/app/_lib/services/chat';
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiChat1 } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import InfiniteScroll from 'react-infinite-scroll-component';
import { supabase } from "../_lib/supabase";
import { decryptMessage } from "../_utlis/crypto";

export default function Page() {
    const { state } = useUserContext();
    const [chats, setChats] = useState<IMyChatsResponse['data'] | null>(null);
    const [chatsPag, setChatsPag] = useState<IMyChatsResponse['pagination'] | null>(null);
    const [page, setPage] = useState<number>(0);
    const [loadingInitialDataStatus, setloadingInitialDataStatus] = useState<'success' | 'error' | 'loading' | null>(null);

    useEffect(() => {
        if (!state.user?.main_id || state.loading) return;

        async function fetchChats() {
            setloadingInitialDataStatus("loading");
            try {
                const res = await getUserConversationsPaginated(state.user!.main_id, 0);

                setChats(res.data);

                setChatsPag(res.pagination);

                setloadingInitialDataStatus("success");
            } catch {
                toast.error("Failed to load chats, tryagian later.");

                setloadingInitialDataStatus("error");

                return;
            }
        }

        fetchChats();

    }, [state])

      useEffect(() => {
        if (!state.user?.main_id) return;

        const channel = supabase
            .channel("my-chats-realtime")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                },
                (payload) => {
                    const newMsg = payload.new;

                    setChats((prev) => {
                        if (!prev) return prev;

                        const convIndex = prev.findIndex((c) => c.id === newMsg.conversation_id);
                        if (convIndex === -1) return prev;

                        const updatedChats = [...prev];
                        const conv = { ...updatedChats[convIndex] };

                        // حدث آخر رسالة
                        conv.messages = [{...newMsg, content : decryptMessage(newMsg.content)}];

                        // شيل الـ conversation من مكانها وحطها الأول
                        updatedChats.splice(convIndex, 1);
                        updatedChats.unshift(conv);

                        return updatedChats;
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [state.user?.main_id]);

    function fetchMore() {
        if (!chatsPag?.hasNextPage || loadingInitialDataStatus === 'loading') return;
        fetchMoreChats(page + 1);
        setPage(prev => prev + 1)
    }

    async function fetchMoreChats(page: number) {
        if (!state?.user?.main_id) return;

        try {
            const chats = await getUserConversationsPaginated(state.user.main_id, page);

            setChats(prev => [...prev!, ...chats.data]);

            setChatsPag(chats.pagination);

        } catch {
            toast.error('Failed to load more chats, tryagian later.');

            return;
        }
    }

    if (state.loading || loadingInitialDataStatus === 'loading')
        return <LoadingFullChatState message="Loading Your Conversations..." />

    if (!state.user?.main_id) return <Login />

    return (
        <div className="flex flex-col space-y-5 my-2.5">
            <MyChatsHeader />

            {
                loadingInitialDataStatus === 'error' &&
                <div className='className="flex-1 text-red-500 font-medium items-center no-scrollbar! h-[75vh] justify-center flex-col flex p-4 space-y-2.5 overflow-y-auto w-full"'>
                    <MdErrorOutline className=' text-5xl' />
                    <p className=''>Failed to load your conversations.</p>
                </div>
            }

            {
                loadingInitialDataStatus === 'success' && chats!.length === 0 &&
                <div className='className="flex-1 font-medium items-center no-scrollbar! h-[75vh] justify-center flex-col flex p-4 space-y-2.5 overflow-y-auto w-full"'>
                    <CiChat1 className='text-5xl' />
                    <p className=''>No Conversations yet, Start Chatting by find your friend.</p>
                    <Link href={'/find-user'} className='my-btn'>Find Friend</Link>
                </div>
            }

            {
                loadingInitialDataStatus === 'success' && chats!.length > 0 &&
                <InfiniteScroll
                    dataLength={chats!.length}
                    next={fetchMore}
                    hasMore={chatsPag!.hasNextPage}
                    className="space-y-2 flex flex-col"
                    loader={
                        <div className='flex justify-center items-center text-center font-medium text-sm'>
                            <p>
                                Loading More Chats...
                            </p>
                        </div>
                    }
                >
                    {chats!.map((chat) => (
                        <ConvCard chat={chat} key={chat.id} />
                    ))}
                </InfiniteScroll>
            }
        </div>
    );
}