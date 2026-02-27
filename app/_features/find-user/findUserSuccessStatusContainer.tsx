"use client";

import useUserContext from "@/app/_customHooks/useUserContext";
import { IFindUserRequest } from "@/app/_interfaces/IFindUserRequest";
import { createConversation } from "@/app/_lib/services/chat";
import { getMonthName, getYear } from "@/app/_utlis/date-helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { IoChatbox } from "react-icons/io5";

export default function FindUserSuccessStatusContainer({ request }: { request: IFindUserRequest }) {
    const { state } = useUserContext();
    const [createChatStatus, setCreateChatStatus] = useState<'loading' | 'error' | null | 'success'>(null);
    const router = useRouter();

    if (!state.user) return null;
    if (!request.user) return null;

    async function handleCreateChat() {
        setCreateChatStatus('loading');
        try {
            const res = await createConversation([state.user!.main_id, request.user!.main_id]);
            router.push(`/chat/${request.user?.main_id}?conv_id=${res.id}&other_user_email=${request.user?.email}&other_user_avatar_url=${request.user?.avatar_url}&other_user_name=${request.user?.name}&other_user_createdAt=${request.user?.createdAt}`);
            setCreateChatStatus('success');
        } catch {
            toast.error('Failed to create new conversation, tryagian later.');
            setCreateChatStatus('error');
            return;
        }
    }
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Results</h3>
                <p className="font-medium italic text-sm">1 User Found</p>
            </div>
            <div className="max-h-[77vh] overflow-y-auto">
                <ul className="flex flex-col space-y-3">
                    <li className="flex bg-gray-100  p-2 rounded-lg items-center justify-between">
                        <div className="flex items-center justify-between space-x-1">
                            {
                                request.user.avatar_url ?
                                    <Image src={request.user.avatar_url} className="rounded-full -mt-1 object-cover" width={48} height={48} alt={request.user.name} aria-label={request.user.name} title={request.user.name} />
                                    :
                                    <div className="bg-gray-200 w-12 h-12 rounded-full -mt-1"></div>
                            }

                            <div className="flex text-xs self-start flex-col">
                                <span className="font-medium capitalize">{request.user.name}</span>
                                <span className="font-semibold">{request.user.email}</span>
                                <span className="italic">Joined {getMonthName(request.user.createdAt)} {getYear(request.user.createdAt)}.</span>
                            </div>

                        </div>
                        <button
                            disabled={createChatStatus === 'loading'}
                            onClick={handleCreateChat}
                            aria-label="Start Chat"
                            title="Start Chat"
                            className="my-btn text-sm flex items-center justify-center pb-1 space-x-1">
                            {
                                createChatStatus === 'loading' ?
                                    <span>
                                        <AiOutlineLoading className="animate-spin" />
                                    </span>
                                    :
                                    <span>
                                        <IoChatbox />
                                    </span>
                            }
                            <span>Chat Now</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
