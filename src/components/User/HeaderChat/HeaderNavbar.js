import React from 'react';

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
        <div>
            <button onClick={onClickDialog}>добавить диалог</button>
            <button onClick={onClickGroup}> добавить группу </button>
            <button onClick={onClickJoinGroup}>присоедениться к группе</button>
        </div>
    )
}

export default HeaderNavbar;