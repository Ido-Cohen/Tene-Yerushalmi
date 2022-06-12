import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";


const SignInLinks = (props) => {
    const {isAdmin, profile} = props;
    return (

        <div className={'sign-in-links'}>

            <ul className={"right hide-on-med-and-down"}>


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
                    <NavLink to={'/'}>הודעות</NavLink>
                </li>
                {isAdmin ? <li>
                    <NavLink to={'/add'}>הוספת קבוצה</NavLink>
                </li> : ''}
                {isAdmin ? <li><NavLink to={'/signup'}>רישום יחיד</NavLink></li> : ''}
                {isAdmin ? <li><NavLink to={'/settings'}>הגדרות משתמשים</NavLink></li> : ''}
                <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <NavLink to={'/signin'} onClick={props.signOut}>התנתקות</NavLink>
                </li>
                <li>
                    <NavLink to={'/userProfile/'+profile.handle}
                             className={"btn btn-floating pink lighten-1"}>{profile.firstName[0] + profile.lastName[0]}</NavLink>
                </li>


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
                    <NavLink to={'/'}>הודעות</NavLink>
                </li>

                {isAdmin ? <li>
                    <NavLink to={'/add'}
                    >הוספת קבוצה</NavLink>
                </li> : ''}
                {isAdmin ? <li><NavLink to={'/signup'}>רישום יחיד</NavLink></li> : ''}
                <li>
                    <NavLink to={'/settings'}
                    >הגדרות משתמשים</NavLink>
                </li>


            </ul>
        </div>

    );
}
const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        isAdmin: state.auth.isAdmin,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInLinks);