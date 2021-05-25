import React from "react";
import InviteLink from "./InviteLink";
import {Button, ButtonGroup} from "react-bootstrap";

const HeaderChatGroups = (props) => {

    const onClickRename = () => {
        let newChatName = prompt('Введите переназвание группу' + " " + props.nameChat);
        props.renameGroup(props.currentChatId, newChatName);
    }

    return (
        <ButtonGroup>
            <div>
                {props.members}
            </div>
            <div>
                <Button variant="outline-primary" onClick={()=>{props.setInvite(props.currentChatId)}}>
                    Получить приглашение </Button>
                <InviteLink invite={props.invite}/>
            </div>
            <div>
                <Button variant="outline-primary" onClick={()=>{props.setNewInvite(props.currentChatId)}}>
                    Получить новое приглашение </Button>
            </div>
            <div>
                <Button variant="outline-primary" onClick={onClickRename}>
                    Переназвать группу </Button>
            </div>

        </ButtonGroup>
    )
}

export default HeaderChatGroups;