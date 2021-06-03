import React, {useState} from 'react';
import {Button, ButtonGroup, FormControl, InputGroup, ListGroup, Modal, Navbar} from "react-bootstrap";
import ModalPrompt from "./ModalWithForm";

const HeaderNavbar = (props) => {

    return (
        <>
            <ButtonGroup aria-label="Basic example" size="sm">
                <ModalPrompt
                    title={"Добавить собеседника"}
                    message={"Введите ID собеседника для начала диалога."}
                    placeholder={"ID"}
                    onSubmit={(text) => {props.addDialog(text, "Что-то пошло не так.")}}
                />
                <ModalPrompt
                    title={"Создать групповой чат"}
                    message={"Введите название группового чата."}
                    placeholder={"Название группы"}
                    onSubmit={(text) => {props.addGroupChat(text, "Что-то пошло не так.")}}
                />
                <ModalPrompt
                    title={"Присоединиться к групповому чату"}
                    message={"Введите ID группового чата для того, чтобы присоединиться."}
                    placeholder={"ID"}
                    onSubmit={(text) => {props.joinToGroup(text, "Такая ссылка не существует.")}}
                />
                </ButtonGroup>
            </>
    )
}

export default HeaderNavbar;