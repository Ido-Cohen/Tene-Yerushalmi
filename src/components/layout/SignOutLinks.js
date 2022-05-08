import React from "react";
import {NavLink} from "react-router-dom";


const SignOutLinks = () => {
    return (
        <div className={'sign-out-links'}>

            <ul className={"right hide-on-med-and-down"}>
                <li>
                    <NavLink to={'/signup'}>Register</NavLink>
                </li>
                <li>
                    <NavLink to={'/signin'}>Login</NavLink>
                </li>
            </ul>
            <ul id="slide-out" className="sidenav">
                <li><NavLink to={'/signup'}>Register</NavLink></li>
                <li><NavLink to={'/signin'}>Login</NavLink></li>
            </ul>
        </div>
    );
}

export default SignOutLinks;