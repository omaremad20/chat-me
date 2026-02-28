import InfiniteScroll from "react-infinite-scroll-component";
import MessageCard, { IMessage } from "./messageCard";

/* eslint-disable-next-line */
export default function MessagesContainer({ messages, fetchMoreFn, hasNextPage, currentUserId } : any) {
    return (
        <div
            id="scrollableDiv"
            className="overflow-y-auto overflow-x-hidden flex-1 flex flex-col-reverse w-full"
        >
            <InfiniteScroll
                dataLength={messages.length}
                next={fetchMoreFn}
                inverse={true}
                hasMore={hasNextPage}
                loader={<p className="text-center animate-pulse font-medium text-lg my-4 text-gray-800">Loading more...</p>}
                scrollableTarget="scrollableDiv"
                className="flex flex-col-reverse p-4 w-full"
            >
                {messages.map((msg: IMessage) =>
                    msg.sender_id === currentUserId ? (
                        <div key={msg.id} className="max-w-11/12 min-w-2/12 ms-auto">
                            <MessageCard message={msg} type="me" />
                        </div>
                    ) : (
                        <div key={msg.id} className="max-w-11/12 min-w-2/12 me-auto">
                            <MessageCard message={msg} type="other_user" />
                        </div>
                    )
                )}
            </InfiniteScroll>
        </div>
    )
}
