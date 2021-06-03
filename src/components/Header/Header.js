import React from 'react';
import s from './Header.module.css';
import {Button, Container, Navbar, Form, Nav, Dropdown, ButtonGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";
import ModalPrompt from "../User/HeaderChat/ModalWithForm";

const Header = (props) => {
    const style_dropdown_menu = {
        background: "#545b62"
    };
    const style_dropdown_item = {
        color: "white"
    };

    return <Navbar expand="md" style={{background: "#3c3f41"}} variant="dark">
        <Navbar.Brand>ТЕЛЕГРАVVЧИК</Navbar.Brand>
        {props.isAuth ?
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{paddingRight: "10px"}}>
                    Signed in as: <a>{props.username}</a>
                    <div>
                        Your ID: <a>{props.uid}</a>
                    </div>
                </Navbar.Text>
                <Dropdown as={ButtonGroup} id="nav-dropdown" variant="dark" alignRight>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Профиль
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{...style_dropdown_menu, marginTop:20}}>
                        <ModalPrompt
                            title={"Изменить имя пользователя"}
                            message={"Введите новое имя, для того чтобы изменить его."}
                            placeholder={"Введите имя"}
                            onSubmit={(changesName) => {
                                props.editProfileUsername(changesName, "Пользователь с таким именем уже существует.")
                            }}
                            renderButton={(onClick) => {
                                return <>
                                    <Dropdown.Item style={style_dropdown_item} onClick={onClick}>
                                        Изменить имя пользователя
                                    </Dropdown.Item>
                                </>
                            }}
                        />
                        <ModalPrompt
                            title={"Изменить пароль пользователя"}
                            message={"Введите новый пароль, для того чтобы изменить его."}
                            placeholder={"Введите пароль"}
                            onSubmit={(changesPassword) => {
                                props.editProfilePassword(changesPassword, "Что-то пошло не так.")
                            }}
                            renderButton={(onClick) => {
                                return <>
                                    <Dropdown.Item style={style_dropdown_item} onClick={onClick}>
                                        Изменить пароль пользователя
                                    </Dropdown.Item>
                                </>
                            }}
                        />
                        <Dropdown.Item
                            style={style_dropdown_item} onClick={() => {
                            if (window.confirm("Вы точно уверены, что хотите удалить страницу пользователя?")
                                && (window.confirm("Точно-точно?"))
                            ) {
                                props.terminateProfile("Что-то пошло не так.")
                            }
                        }}>
                            Удалить страничку
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item
                            style={style_dropdown_item} onClick={props.logOut}>
                            Выйти
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Collapse>
            : <Navbar.Collapse className="justify-content-end">
                <Link to={"/login"}>
                    <Button variant="outline-light" className="mr-2">Войти</Button> {' '}
                </Link>
                <Link to={"/register"}>
                    <Button variant="outline-light">Зарегистрироваться</Button>
                </Link>
            </Navbar.Collapse>
        }

    </Navbar>
}
export default Header;





