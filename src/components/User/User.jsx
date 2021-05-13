import React from 'react';
import s from './User.module.css';
import {NavLink} from "react-router-dom";

const User = (props) => {
    return (
        <div className={s.nav}>
            <div className={s.item}>
                <div >тут челики </div>
            </div>
            <div className={s.item}>
                <div>тут челики </div>
            </div>
        </div>
    )
}
export default User;