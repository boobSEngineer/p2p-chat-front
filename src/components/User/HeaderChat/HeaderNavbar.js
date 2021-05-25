import React from 'react';
import {Button, ButtonGroup, ListGroup, Navbar} from "react-bootstrap";

const HeaderNavbar = (props) => {

    const onClickDialog = () =>{
        let yourId = prompt('Введите id');
        props.addDialog(yourId);
    }

    const onClickGroup = () =>{
        let chatName = prompt('Введите название группы');
        props.addGroupChat(chatName);
    }

    const onClickJoinGroup = () =>{
        let inviteUid = prompt('Введите id группы');
        props.joinToGroup(inviteUid);
    }

    return (
            <ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="outline-primary" onClick={onClickDialog}>добавить диалог</Button>
                <Button variant="outline-primary" onClick={onClickGroup}> добавить группу </Button>
                <Button variant="outline-primary" onClick={onClickJoinGroup}>присоедениться к группе</Button>
            </ButtonGroup>
    )
}

export default HeaderNavbar;