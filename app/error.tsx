"use client";

/* eslint-disable-next-line */
export default function error({ error, reset }: { error: any, reset: any }) {
    return (
        <div  className="m-3 h-[85vh] flex flex-col justify-center items-center text-center space-y-3">
            <h1 className="font-semibold text-2xl">Something went wrong :(</h1>
            <button className="my-btn w-1/4 pb-1.5!" onClick={() => reset()}>Tryagian</button>
        </div>
    )
}
