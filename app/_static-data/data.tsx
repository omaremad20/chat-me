import { BiLogoGmail } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiGlobe, FiUsers, FiZap } from "react-icons/fi";
import { MdAccountCircle, MdLockPerson } from "react-icons/md";
import { RiFindReplaceLine } from "react-icons/ri";
import { INavlink } from "@/app/_interfaces/INavlink";
import { IContactMe } from "@/app/_interfaces/IContactme";
import { IWhyChatMe } from "@/app/_interfaces/IWhyChatMe";

const whyChatMe:IWhyChatMe[] = [
  {
    icon: <MdLockPerson className="text-3xl" />,
    heading: "End-to-End Encrypted",
    description: "Your messages stay private. Even we can’t read them.",
  },
  {
    icon: <FiZap className="text-3xl" />,
    heading: "Fast & Real-time",
    description: "Instant messaging powered by modern web technologies.",
  },
  {
    icon: <FiUsers className="text-3xl" />,
    heading: "One-to-One Chats",
    description: "Simple private conversations without distractions.",
  },
  {
    icon: <FiGlobe className="text-3xl" />,
    heading: "Access Anywhere",
    description: "Use it on any device, anytime.",
  }
]

const contactMe: IContactMe[] = [
  {
    href: "https://www.linkedin.com/in/omar-emad-422b12310",
    title: "Linked In",
    icon: <span className="bg-black text-white flex items-center justify-center rounded-full h-10 w-10"><FaLinkedinIn className="text-2xl" /></span>
  },
  {
    href: "https://github.com/omaremad20",
    title: "GitHub",
    icon: <span className="bg-black text-white flex items-center justify-center rounded-full h-10 w-10"><FaGithub className="text-2xl" /></span>
  },
  {
    href: "https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=omarremaddalii@gmail.com&amp;su=Website%20Inquiry&amp;body=Hello%20Omar,",
    title: "Gmail",
    icon: <span className="bg-black text-white flex items-center justify-center rounded-full h-10 w-10"><BiLogoGmail className="text-2xl" /></span>
  },
]

const navLinks: INavlink[] = [
  {
    label: "My Chats",
    href: "my-chats",
    icon: <BsChatSquareDots />,
  },
  {
    label: "Find User",
    href: "find-user",
    icon: <RiFindReplaceLine />,
  },
  {
    label: "My Account",
    href: "my-account",
    icon: <MdAccountCircle />,
  },
]

export {
  whyChatMe,
  contactMe,
  navLinks
}