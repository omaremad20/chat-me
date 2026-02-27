
/* eslint-disable-next-line */
export default function FindUserFormContainer({ handleSubmit, email, setEmail, handleFocus }: { handleSubmit: any, email: string, setEmail: any, handleFocus: any }) {

    return (
        <div className="flex justify-center border rounded-md py-2.5 px-5 border-gray-100 border-l-0 shadow bg-white items-center">
            <div className='bg-gray-100 w-full rounded-lg p-5 shadow border border-transparent flex flex-col space-y-4'>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className='flex flex-col space-y-1'>
                        <label className='text-sm font-medium' htmlFor="email">Friend Email</label>
                        <input onFocus={handleFocus} aria-label="Email" title="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name='email' placeholder='e.g. email@gmail.com' className='bg-white p-1 rounded-lg outline-0 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 transition-all ease-in-out duration-100 border border-transparent outline-bg-gray-300' />
                    </div>
                    <button aria-label="Find User" title="Email" type="submit" className='my-btn w-full p-1.5!'>Find User</button>
                </form>
            </div>
        </div>
    )
}
