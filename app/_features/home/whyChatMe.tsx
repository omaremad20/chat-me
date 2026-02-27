import { IWhyChatMe } from "@/app/_interfaces/IWhyChatMe";
import { whyChatMe } from "@/app/_static-data/data";

export default function WhyChatMe() {
    return (
        <section className="border-b border-b-gray-300 mb-5! pb-5 space-y-5">
            <h3 className="text-center font-medium text-2xl">WHY CHAT ME</h3>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    whyChatMe.map((item: IWhyChatMe) => <li key={item.description} className="bg-gray-200 hover:bg-gray-200/75 transition-colors ease-in-out duration-200 flex flex-col space-y-2 justify-center items-center rounded-lg border border-transparent shadow p-3">
                        <span className="rounded-full bg-gray-100 p-4">
                            {item.icon}
                        </span>
                        <p className="text-center font-medium">
                            {item.heading}
                        </p>
                        <p className="text-center text-sm">
                            {item.description}
                        </p>
                    </li>)
                }
            </ul>
        </section>
    )
}
