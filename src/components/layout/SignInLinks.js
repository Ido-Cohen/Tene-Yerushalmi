import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";


const SignInLinks = (props) => {
    const {isAdmin} = props;
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

                {isAdmin ? <li>
                    <NavLink to={'/maps'}>מפה</NavLink>
                </li> : ''}
                <li>
                    <NavLink to={'/contacts'}>אנשי קשר</NavLink>
                </li>
                <li>
                    <NavLink to={'/create'}>הודעה חדשה</NavLink>
                </li>
                {isAdmin ?  <li>
                    <NavLink to={'/add'}>הוספת קבוצה</NavLink>
                </li> : ''}
                {isAdmin ? <li><NavLink to={'/signup'}>רישום יחיד</NavLink></li> : ''}




            </ul>
            <ul id="slide-out" className="sidenav">
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <NavLink to={'/signin'} onClick={props.signOut}>התנתקות</NavLink>
                </li>

                {isAdmin ? <li>
                    <NavLink to={'/maps'}>מפה</NavLink>
                </li> : ''}
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
                {isAdmin ? <li>
                    <NavLink to={'/add'}
                    >הוספת קבוצה</NavLink>
                </li> : ''}
                {isAdmin ? <li><NavLink to={'/signup'}>רישום יחיד</NavLink></li> : ''}


            </ul>
        </div>

    );
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        isAdmin: state.auth.isAdmin
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInLinks);