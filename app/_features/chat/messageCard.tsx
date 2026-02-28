import { formatEgyptianTime, handleMessageTime } from "@/app/_utlis/date-helpers";

export interface IMessage {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    created_at: string;
}

export default function MessageCard({ type, message }: { type: "me" | "other_user", message: IMessage }) {
    if (type === 'other_user') return (
        <div className='bg-[#25343F] text-white rounded-md p-2 py-1 space-y-1 mb-2'>
            <p className='font-medium'>{message.content}</p>
            <div className='w-full text-xs flex justify-end items-center'>
                <time className="font-medium">{handleMessageTime(message.created_at).dayName} &bull; {handleMessageTime(message.created_at).fullDate} &bull; {formatEgyptianTime(message.created_at)}</time>
            </div>
        </div>
    )

    return (
        <div className='bg-[#BFC9D1] rounded-md p-2 space-y-1 py-1 mb-2 '>
            <p className='font-semibold'>{message.content}</p>
            <div className='w-full text-xs flex justify-end items-center'>
                <time className="font-medium">{handleMessageTime(message.created_at).dayName} &bull; {handleMessageTime(message.created_at).fullDate} &bull; {formatEgyptianTime(message.created_at)}</time>
            </div>
        </div>
    )
}
