import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function loading() {
    return (
        <div className="flex flex-col h-[85vh] items-center space-y-2 justify-center">
            <AiOutlineLoading3Quarters className="text-7xl animate-spin" />
            <p>Loading please wait...</p>
        </div>
    )
}
