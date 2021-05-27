import React from 'react';
import s from './Header.module.css';
import {Button, Container, Navbar, Form, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

const Header = (props) => {
    return <Navbar expand="md" style={{background:"#3c3f41"}} variant="dark">
        <Navbar.Brand>ТЕЛЕГРАVVЧИК</Navbar.Brand>
        {props.isAuth ?
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{paddingRight:"10px"}}>
                    Signed in as: <a>{props.username}</a>
                    <div>
                        Your ID: <a>{props.uid}</a>
                    </div>
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





