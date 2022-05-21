import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";


const SignInLinks = (props) => {
    return (
        <div className={'sign-in-links'}>

            <ul className={"left hide-on-med-and-down"}>
                <li>
                    <NavLink to={'/settings'}
                             className={"btn btn-floating pink lighten-1"}>{props.profile.initials}</NavLink>
                </li>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={props.signOut}>התנתקות</a>
                </li>

                <li>
                    <NavLink to={'/maps'}>מפה</NavLink>
                </li>
                <li>
                    <NavLink to={'/contacts'}>אנשי קשר</NavLink>
                </li>
                <li>
                    <NavLink to={'/create'}>הודעה חדשה</NavLink>
                </li>


            </ul>
            <ul id="slide-out" className="sidenav">
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={props.signOut}>התנתקות</a>
                </li>

                <li>
                    <NavLink to={'/maps'}>מפה</NavLink>
                </li>
                <li>
                    <NavLink to={'/contacts'}>אנשי קשר</NavLink>
                </li>
                <li>
                    <NavLink to={'/create'}>הודעה חדשה</NavLink>
                </li>
                <li>
                    <NavLink to={'/settings'}
                             >הגדרות משתמשים</NavLink>
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