import React, {Component} from 'react';
import {connect} from "react-redux";
import {signIn} from "../../store/actions/authActions";
import {Navigate} from "react-router";

import {NavLink} from "react-router-dom";
// import userDetails from "../Settings/userDetails";
import axios from "axios";
//check
class SignIn extends Component {
    state = {email:'',password:''};

    handleChange = (e) => {
        this.setState({
        [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }
    render() {
        const {authError,auth,users} = this.props;
        if (auth.uid){
            if(users && users[auth.uid].isNewUser){
                return <Navigate replace to={'/reset-password/new-user'}/>
            }
            return <Navigate replace to={'/'}/>
        }
        return (
            <div className={"container"}>
                <form className={"white"} onSubmit={this.handleSubmit}>
                    <h5 className={"grey-text text-darken-3"}>Sign In</h5>
                    <div className={"input-field"}>
                        <label htmlFor={"email"}>Email</label>
                        <input type={"email"} id={"email"} onChange={this.handleChange}/>
                    </div>
                    <div className={"input-field"}>
                        <label htmlFor={"password"}>Password</label>
                        <input type={"password"} id={"password"} onChange={this.handleChange}/>
                    </div>
                    <div className={"input-field"}>
                        <button className={"btn pink lighten-1 z-depth-0"}>Login</button>
                        <div className={"red-text center"}>
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                    <div className={"orange-text center-align"}>
                        <NavLink to={"/forgot-password"}>שכחתי סיסמא</NavLink>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state.firestore.data.users[state.firebase.auth.uid]);
  return {
      authError: state.auth.authError,
      auth: state.firebase.auth,
      users: state.firestore.data.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      signIn: (creds) => dispatch(signIn(creds))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignIn);