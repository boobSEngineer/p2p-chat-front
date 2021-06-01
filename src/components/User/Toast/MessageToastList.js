import React from "react";
import MessageToast from "./MessageToast";

const MessageToastList = (props) => {
    return <>
        <div style={{position:"absolute", bottom: 0, zIndex: 1000, width: "40vw"}}>
            {
                props.toasts.map(c => {
                    return <MessageToast toast={c} removeToast={props.removeToast}/>
                })
            }
        </div>
    </>
}

export default MessageToastList;