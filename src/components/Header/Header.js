import React from 'react';
import s from './Header.module.css';
import {Button, Container, Navbar, Form, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

const Header = (props) => {
    return <Navbar expand="md" bg="primary" variant="light">
        <Navbar.Brand>ТЕЛЕГРАЧИК</Navbar.Brand>
        {props.isAuth ?
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a>{props.username}</a> <a>{props.uid}</a>
                </Navbar.Text>
                <Button variant="outline-light" onClick={props.logOut}>Выйти</Button>
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





