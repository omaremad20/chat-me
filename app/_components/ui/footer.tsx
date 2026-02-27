import { FaHeart } from "react-icons/fa";
import { IContactMe } from "@/app/_interfaces/IContactme";
import { contactMe } from "@/app/_static-data/data";

export default function Footer() {
    return (
        <footer className="bg-gray-200 p-2 rounded-t-lg border border-gray-300 border-b-0 shadow">
            <p className="text-center italic font-medium flex space-x-1 items-center justify-center">
                <span>
                    Made with
                </span>
                <span>
                    <FaHeart className="fill-red-500" />
                </span>
                <span>
                    by omaremad using Next.js & Supabase
                </span>
            </p>

            <section className="flex items-center justify-center flex-col my-4 space-y-2">
                <h6 className="text-center font-medium text-xl">Contact Me</h6>
                <ul className="flex items-center space-x-3">
                    {
                        contactMe.map((item: IContactMe) => <li key={item.title}>
                            <a
                                target="_blank"
                                aria-label={item.title}
                                title={item.title}
                                href={item.href}
                            >
                                {item.icon}
                            </a>
                        </li>)
                    }
                </ul>
            </section>

            <p className="text-xs font-medium text-center ">© {new Date().getFullYear()} Chat Me All rights reserved </p>
        </footer>
    )
}
