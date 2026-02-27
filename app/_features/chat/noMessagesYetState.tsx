import { CiChat1 } from "react-icons/ci";

export default function NoMessagesYetState() {
    return (
        <div className='className="flex-1 font-medium items-center no-scrollbar! max-h-full flex-col flex p-4 space-y-2.5 overflow-y-auto w-full"'>
            <CiChat1 className='text-5xl' />
            <p className=''>No messages yet, start chatting now!</p>
        </div>
    )
}
