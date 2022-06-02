import React, {Component, useState} from 'react';
import {connect} from "react-redux";
import {createMessage} from "../../store/actions/messageActions";
import {Navigate} from "react-router";
import {passwordReset} from "../../store/actions/authActions";

const CreateMessage = (props) => {
    const {auth, passwordReset} = props;
    const [state, setState] = useState('');

    const handleChange = (e) => {
        setState(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        passwordReset(state);
        // window.open('/signin');
    }

    if (auth.uid) {
        return <Navigate replace to={'/'}/>
    }
    return (
        <div className={"container"}>
            <form className={"white right-align"} onSubmit={handleSubmit}>
                <h5 className={"grey-text text-darken-3"}>איפוס סיסמא</h5>
                <div className={"input-field"}>
                    <label htmlFor={"email"} >Email</label>
                    <input type={"email"} id={"email"} onChange={handleChange}/>
                </div>
                <div className={"input-field"}>
                    <button className={"btn pink lighten-1 z-depth-0"}>איפוס סיסמא</button>
                </div>
            </form>
        </div>
    );

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        passwordReset: (email) => dispatch(passwordReset(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage);