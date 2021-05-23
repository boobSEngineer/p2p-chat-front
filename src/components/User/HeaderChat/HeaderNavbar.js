import React from 'react';

const HeaderNavbar = (props) => {

    const modalDialog = () =>{
        let yourId = prompt('Введите id');
        props.addDialog(yourId);
    }

    const modalGroup = () =>{
        let chatName = prompt('Введите название группы');
        props.addGroupChat(chatName);
    }

    const modalJoinGroup = () =>{
        let inviteUid = prompt('Введите id группы');
        props.joinToGroup(inviteUid);
    }

    return (
        <div>
            <button onClick={modalDialog}>добавить диалог</button>
            <button onClick={modalGroup}> добавить группу </button>
            <button onClick={modalJoinGroup}>присоедениться к группе</button>
        </div>
    )
}

export default HeaderNavbar;