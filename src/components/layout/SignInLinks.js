import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";


const SignInLinks = (props) => {
    return (
        <div className={'sign-in-links'}>

            <ul className={"right hide-on-med-and-down"}>
                <li>
                    <NavLink to={'/settings'}
                             className={"btn btn-floating pink lighten-1"}>{props.profile.initials}</NavLink>
                </li>
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <NavLink to={'/signin'} onClick={props.signOut}>התנתקות</NavLink>
                </li>
                <li>
                    <NavLink to={'/signup'}>הוספת בוגר</NavLink>
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
                    <NavLink to={'/add'}>הוספת קבוצה</NavLink>
                </li>
                <li><NavLink to={'/signup'}>רישום יחיד</NavLink></li>




            </ul>
            <ul id="slide-out" className="sidenav">
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <NavLink to={'/signin'} onClick={props.signOut}>התנתקות</NavLink>
                </li>
                <li>
                    <NavLink to={'/signup'}>הוספת בוגר</NavLink>
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
                <li>
                    <NavLink to={'/add'}
                    >הוספת קבוצה</NavLink>
                </li>
                <li><NavLink to={'/signup'}>רישום יחיד</NavLink></li>


            </ul>
        </div>

    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(null, mapDispatchToProps)(SignInLinks);