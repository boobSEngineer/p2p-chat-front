import React from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>
        <div className={s.loginblock}>
            {props.isAuth
                ?
                <div>
                    <div> className={s.logintext}> {props.login} {props.authorizedUserId} </div>
                    <div>
                        <button>Log out</button>
                    </div>
                </div>
                :
                <NavLink className={s.logintext} to={'/login'}>LOGIN</NavLink>
            }
        </div>
</header>
}
export default Header;