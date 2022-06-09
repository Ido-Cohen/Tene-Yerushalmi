import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";
import {Navigate} from "react-router";


const SignInLinks = (props) => {
    return (
        <div className={'sign-in-links'}>

            <ul className={"left hide-on-med-and-down"}>
                <li>
                    <div className={"btn btn-floating pink lighten-1"}>{props.profile.initials}</div>
                </li>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={props.signOut}>התנתקות</a>
                </li>
            </ul>
            <ul id="slide-out" className="sidenav">
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={props.signOut}>התנתקות</a>
                </li>
            </ul>
        </div>

    );
}
const mapDispatchToProps = (disptach) => {
    return {
        signOut: () => disptach(signOut())
    }
}
export default connect(null, mapDispatchToProps)(SignInLinks);