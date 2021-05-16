import React from 'react';
import s from './User.module.css';
//import NavLink from "react-router-dom/modules/NavLink";


const User = (props) => {
    return (
        <div>{
            props.users.map(u =>
                <div key={u.uid} className={s.nav}>
                    {/*<NavLink to={`/dialog${u.id}`}>*/}
                    {/*    <div className={s.item}>*/}
                    {/*        <div> {u.login} </div>*/}
                    {/*        <div> {u.uid} </div>*/}
                    {/*    </div>*/}
                    {/*</NavLink>*/}
                </div>)
        }
        </div>
    )
}

export default User;