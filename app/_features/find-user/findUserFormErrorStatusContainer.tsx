import { MdErrorOutline } from "react-icons/md";

export default function FindUserFormErrorStatusContainer() {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Results</h3>
                <p className="font-medium italic text-sm">0 User Found</p>
            </div>
            <div className="h-[75vh] flex flex-col text-red-500 uppercase font-semibold justify-center items-center space-y-3">
                <MdErrorOutline className=" text-5xl" />
                <p className="text-xl text-center">Failed to load user</p>
            </div>
        </div>
    )
}
