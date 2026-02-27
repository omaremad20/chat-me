import React from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

export default function FindUserFormLoadingStatusContainer() {
    return (
        <div className="h-[80vh] flex flex-col justify-center text-gray-600 items-center space-y-3">
            <LuLoaderCircle className="animate-spin text-5xl" />
            <p className="text-xl text-center animate-pulse">Loading...</p>
        </div>
    )
}
