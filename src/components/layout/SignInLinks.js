import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authActions";


const SignInLinks = (props) => {
    console.log(props);
    return(
        <ul className={"right"}>
            <li>
                <NavLink to={'/create'}>New Message</NavLink>
            </li>
            <li>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={props.signOut}>Log out</a>
            </li>
            <li>
                <NavLink to={'/settings'} className={"btn btn-floating pink lighten-1"}>{props.profile.initials}</NavLink>
            </li>

        </ul>
    );
}
const mapDispatchToProps = (disptach) => {
  return {
      signOut: () => disptach(signOut())
  }
}
export default connect(null,mapDispatchToProps)(SignInLinks);