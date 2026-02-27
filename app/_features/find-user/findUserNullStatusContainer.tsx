import { CiSearch } from "react-icons/ci";

export default function FindUserNullStatusContainer() {
    return (
        <div className="h-[80vh] flex flex-col text-gray-600 uppercase font-semibold justify-center items-center space-y-3">
            <CiSearch className="text-5xl" />
            <p className="text-xl text-center">Start searching to see results here</p>
        </div>
    )
}
