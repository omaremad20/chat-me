import Link from "next/link";

export default function notfound() {
  return (
    <div className="m-3 h-[85vh] flex flex-col justify-center items-center text-center space-y-3">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-medium">404</h1>
        <h2 className="text-2xl font-medium">
          Sorry, This Page Not Found.
        </h2>
      </div>


      <Link className="my-btn pb-1.5! w-1/4" href={'/'}>Home</Link>
    </div>
  )
}
