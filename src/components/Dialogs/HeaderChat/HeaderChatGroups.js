import React from "react";
import InviteLink from "./InviteLink";
import {Button, ButtonGroup, Dropdown, Navbar} from "react-bootstrap";
import s from "./HeaderChatGroups.module.css"

const HeaderChatGroups = (props) => {

    const onClickRename = () => {
        let newChatName = prompt('Введите переназвание группу' + " " + props.nameChat);
        props.renameGroup(props.currentChatId, newChatName);
    }

    const style_dropdown_menu = {
        background: "#2d2d2d"
    };
    const style_dropdown_item = {
        color: "white"
    };

    return (
        <>
            <div className={s.link}>
                <InviteLink invite={props.invite}/>
            </div>
            <Dropdown as={ButtonGroup} id="nav-dropdown" variant="dark" alignRight>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    . . .
                </Dropdown.Toggle>
                <Dropdown.Menu style={style_dropdown_menu}>
                    <Dropdown.Item
                        style={style_dropdown_item} onClick={() => {
                            props.setInvite(props.currentChatId)
                        }}>
                            Получить приглашение
                    </Dropdown.Item>
                    <Dropdown.Item
                        style={style_dropdown_item} onClick={() => {
                            props.setNewInvite(props.currentChatId)
                        }}>
                            Получить новое приглашение
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                        style={style_dropdown_item} onClick={onClickRename}>
                            Переназвать группу
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default HeaderChatGroups;