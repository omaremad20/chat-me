import { MdErrorOutline } from 'react-icons/md'

export default function FailedToLoadFullChatState() {
    return (
        <div className='className="flex-1 text-red-500 font-medium items-center no-scrollbar! max-h-full flex-col flex p-4 space-y-2.5 overflow-y-auto w-full"'>
            <MdErrorOutline className=' text-5xl' />
            <p className=''>Failed to load chat</p>
        </div>
    )
}
