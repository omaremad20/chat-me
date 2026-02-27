import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="space-y-4 border-b border-b-gray-300 mb-5 flex flex-col h-[85vh] justify-center items-center">
      <h1 className="text-7xl text-center uppercase font-semibold">Chat Securely. <br />Talk freely</h1>
      <p className="text-gray-700 text-xl text-center">
        A simple and secure real-time chat app.
        Your messages are private, encrypted,
        <br />
        and only visible to you and the people you chat with.
      </p>

      <Link href={'/my-chats'} aria-label="My Chats" title="My Chats" className="my-btn pb-2.5! px-4! p-2!">My Chats</Link>
    </section>
  )
}
