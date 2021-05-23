import React from "react";

const HeaderChatGroups = (props) => {

    const onClickRename = () => {
        let newChatName = prompt('Введите переназвание группу' + " " + props.nameChat);
        props.renameGroup(props.currentChatId, newChatName);
    }
    return (
        <div>
            <div>
                <button> Получить приглашение </button>
            </div>
            <div>
                <button> Получить новое приглашение </button>
            </div>
            <div>
                <button onClick={onClickRename}> Переназвать группу </button>
            </div>

        </div>
    )
}

export default HeaderChatGroups;