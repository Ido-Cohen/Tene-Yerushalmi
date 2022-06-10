import React from "react";
import MessageSummary from "./MessageSummaryT";
import {Link} from "react-router-dom";

const MessageList = ({messages}) => {

    return (
        <div>

            <div className={"text-right bg-gray-400"}>
                        <span
                            className="text-4xl font-semibold inline-block py-2 px-8 uppercase rounded text-orange-700 bg-orange-200 uppercase last:mr-0 mr-1">
                          הודעות כלליות
                        </span>

            </div>


            <div style={{height: 755}} className={"message-list section bg-gray-400 overflow-y-scroll px-20 py-10 grid md:grid-cols-4  sm:grid-cols-2 gap-5"}>
                {messages && messages.map(message => {
                    return (
                        <Link to={"/message/" + message.id} key={message.id}>
                            <MessageSummary message={message}/>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}

export default MessageList;