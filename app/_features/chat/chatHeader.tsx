"use client";

import { IOtherUser } from '@/app/_interfaces/IOtherUser';
import { getMonthName, getYear } from '@/app/_utlis/date-helpers';
import noneBg from '@/public/none.jpg';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface ChatHeaderProps {
    other_user: IOtherUser;
}

export default function ChatHeader({ other_user }: { other_user: ChatHeaderProps['other_user'] }) {
    const router = useRouter();

    return (
        <div className="bg-gray-200 border-b ps-1.5 border-gray-300 p-2.5 w-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => router.back()}
                        type='button'
                        aria-label='go back'
                        title='go back'>
                        <p className="hover:bg-gray-200/95 cursor-pointer transition-colors ease-in-out duration-200 text-gray-700 hover:text-gray-800 border-gray-300 w-10 h-10 flex items-center justify-center rounded-md text-lg">
                            <FaArrowLeft />
                        </p>
                    </button>

                    <div className="border border-gray-300 p-0.5 rounded-full w-12 h-12 flex items-center justify-center">
                        {
                            !other_user.avatarUrl ?
                                <Image
                                    src={noneBg}
                                    alt="none image"
                                    title="none image"
                                    aria-label="none image"
                                    className="object-cover rounded-full"
                                />
                                :
                                <Image
                                    src={other_user.avatarUrl}
                                    alt={`User ${other_user.name}`}
                                    title={`User ${other_user.name}`}
                                    width={48}
                                    height={48}
                                    aria-label={`User ${other_user.name}`}
                                    className="object-cover rounded-full"
                                />
                        }
                    </div>

                    <div className="flex flex-col self-start text-sm font-medium">
                        <p>{other_user.email}</p>
                        <p className="text-xs font-normal ms-0.5">{other_user.name} &bull; Joined {getMonthName(other_user.createdAt)} {getYear(other_user.createdAt)}.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
