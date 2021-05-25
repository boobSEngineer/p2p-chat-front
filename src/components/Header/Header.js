import React from 'react';
import s from './Header.module.css';
import {Button, Container, Navbar, Form, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

const Header = (props) => {
    return <Navbar expand="md" bg="light" variant="light">
                <div>
                    {props.isAuth
                    ?
                    <div>
                        {props.username} {props.uid}
                        <Button variant="outline-primary" onClick={props.logOut}>Log out</Button>
                    </div>
                    :
                    <div>
                        <Link to={"/login"}>
                            <Button variant="outline-primary" className="mr-2">Login</Button> {' '}
                        </Link>
                        <Link to={"/register"}>
                            <Button variant="outline-primary">Register</Button>
                        </Link>
                    </div>}
                </div>
    </Navbar>
}
export default Header;