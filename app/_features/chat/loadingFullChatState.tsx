import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingFullChatState({ message = 'Loading Chat...' }: { message?: string }) {
    return (
        <div className='className="flex-1 items-center no-scrollbar! h-[85vh] justify-center flex-col flex p-4 space-y-2.5 overflow-y-auto w-full"'>
            <AiOutlineLoading3Quarters className='animate-spin text-5xl' />
            <p className='animate-pulse'>{message}</p>
        </div>
    )
}
