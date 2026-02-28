import { IoMdSend } from 'react-icons/io'

/* eslint-disable-next-line */
export default function SendMessageForm({ handleInputResize, handleInputChange, handleFormSubmit, content }: { handleInputResize: any, handleInputChange: any, handleFormSubmit: any, content: string }) {
    return (
        <div className="w-full p-2 border-t border-t-gray-300">
            <div className="flex items-center w-full space-x-4">
                <textarea
                    name="content"
                    id="content"
                    rows={1}
                    onChange={handleInputChange}
                    value={content}
                    onInput={handleInputResize}
                    className="outline-0 w-full p-2 border rounded-md border-gray-300 resize-none no-scrollbar!"
                    placeholder="Type your message here..."
                />
                <button
                    type='button'
                    aria-label='Send Message'
                    title='Send Message'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleFormSubmit}
                    className="rounded-full bg-[#FF9B51] hover:bg-[#f98b37] cursor-pointer text-[#25343F] transition-colors ease-in-out self-end hover:text-black p-3 flex items-center justify-center"
                >
                    <IoMdSend />
                </button>
            </div>
        </div>
    )
}
