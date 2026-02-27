import { Daum } from "@/app/_interfaces/IMyChatsResponse";
import { handleMessageTime } from "@/app/_utlis/date-helpers";
import noneBg from '@/public/none.jpg';
import Image from "next/image";
import Link from "next/link";

export default function ConvCard({ chat }: { chat: Daum }) {
    return (
        <Link
            key={chat.id}
            aria-label={`Chat with ${chat.other_user.name}`}
            title={`Chat with ${chat.other_user.name}`}
            href={`/chat/${chat.other_user.main_id}?conv_id=${chat.id}&other_user_email=${chat.other_user.email}&other_user_avatar_url=${chat.other_user.avatar_url}&other_user_name=${chat.other_user.name}&other_user_createdAt=${chat.other_user.createdAt}`}
        >
            <div className="flex bg-gray-100 rounded-sm justify-between p-2 border-t border-b border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors ease-in-out duration-200">
                <div className="flex space-x-1">
                    <div className="border border-gray-200 w-13 h-13 rounded-full p-0.5">
                        {!chat.other_user.avatar_url ?
                            <Image
                                alt="none image"
                                title="none image"
                                width={48}
                                height={48}
                                src={noneBg}
                                className="rounded-full object-cover w-full"
                            />
                            :
                            <Image
                                alt={`User ${chat.other_user.name}`}
                                title={`User ${chat.other_user.name}`}
                                width={48}
                                height={48}
                                src={chat.other_user.avatar_url}
                                className="rounded-full object-cover w-full"
                            />
                        }
                    </div>
                    <div className="self-start flex-1">
                        <p className="text-sm font-medium">{chat.other_user.email}</p>
                        <p className="text-xs ms-1 truncate w-36"><span className="font-semibold">{chat.messages.at(0)?.sender_id !== chat.other_user.main_id ? 'Your Friend : ' : 'You : '}</span>{chat.messages?.at(0)?.content || `Conversation created`}</p>
                    </div>
                </div>
                <time className="text-xs font-medium"> &bull; {handleMessageTime(chat.messages.at(0)!.created_at || chat.created_at).fullDate}</time>
            </div>
        </Link>
    )
}
