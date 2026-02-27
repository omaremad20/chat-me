import InfiniteScroll from "react-infinite-scroll-component";
import MessageCard, { IMessage } from "./messageCard";

/* eslint-disable-next-line */
export default function MessagesContainer({ messages, fetchMoreFn, hasNextPage, currentUserId, bottomRef, bottomRefSecond }: { messages: IMessage[]; fetchMoreFn: any; hasNextPage: boolean, currentUserId: string, bottomRef: any, bottomRefSecond: any }) {
    return (
        <div
            id="scrollableDiv"
            className="overflow-y-auto no-scrollbar! overflow-x-hidden flex-1 flex flex-col-reverse w-full"
        >
            <InfiniteScroll
                dataLength={messages.length}
                
                next={fetchMoreFn}
                inverse={true}
                hasMore={hasNextPage}
                loader={<p className="text-center animate-pulse font-medium text-lg my-4 text-gray-800">Loading more oldest messages...</p>}
                scrollableTarget="scrollableDiv"
                className="flex flex-col-reverse p-4  w-full"
            >
                {messages.map((msg: IMessage) =>
                    msg.sender_id === currentUserId ? (
                        <div key={msg.id} className="max-w-11/12 min-w-2/12 ms-auto">
                            <MessageCard message={msg} key={msg.id} type="me" />
                            <div ref={bottomRef} />
                        </div>
                    ) : (
                        <div key={msg.id} className="max-w-11/12 min-w-2/12 me-auto">
                            <MessageCard message={msg} type="other_user" />
                            <div ref={bottomRefSecond} />
                        </div>
                    )
                )}
            </InfiniteScroll>
        </div>
    )
}
