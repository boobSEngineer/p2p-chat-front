import React from "react";
import InviteLink from "./InviteLink";

const HeaderChatGroups = (props) => {

    const onClickRename = () => {
        let newChatName = prompt('Введите переназвание группу' + " " + props.nameChat);
        props.renameGroup(props.currentChatId, newChatName);
    }

    return (
        <div>
            <div>
                {props.members}
            </div>
            <div>
                <button onClick={()=>{props.setInvite(props.currentChatId)}}> Получить приглашение </button>
                <InviteLink invite={props.invite}/>
            </div>
            <div>
                <button onClick={()=>{props.setNewInvite(props.currentChatId)}}> Получить новое приглашение </button>
            </div>
            <div>
                <button onClick={onClickRename}> Переназвать группу </button>
            </div>

        </div>
    )
}

export default HeaderChatGroups;