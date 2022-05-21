import React, {Component, useState} from 'react';
import {Navigate} from "react-router";
import {connect} from "react-redux";
import {signUp} from "../../store/actions/authActions";


const SignUp = (props) => {
    const {auth, authError} = props;
    const [state, setState] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        address: ''
    });
    const handleChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }
    const handleSubmit = (e, signUp) => {
        e.preventDefault();
        signUp(state);
    }
    const handleSelect = (e) => {
        e.preventDefault();
    }
    if (auth.uid) {
        return <Navigate replace to={'/'}/>
    }
    return (
        <div className={"container"}>
            <form className={"white"} onSubmit={(e) => {
                handleSubmit(e, props.signUp)
            }}>
                <h5 className={"grey-text text-darken-3"}>Sign Up</h5>
                <div className={"input-field"}>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"email"} id={"email"} onChange={(e) => {
                        handleChange(e)
                    }}/>
                </div>
                <div className={"input-field"}>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} onChange={(e) => {
                        handleChange(e)
                    }}/>
                </div>
                <div className={"input-field"}>
                    <label htmlFor={"firstName"}>First Name</label>
                    <input type={"text"} id={"firstName"} onChange={(e) => {
                        handleChange(e)
                    }}/>
                </div>
                <div className={"input-field"}>
                    <label htmlFor={"lastName"}>Last Name</label>
                    <input type={"text"} id={"lastName"} onChange={(e) => {
                        handleChange(e)
                    }}/>
                </div>
                {/*<input type={"text"} id={"address"} onChange={(e) => {*/}
                {/*    handleChange(e)*/}
                {/*}}/>*/}
                <div className={"input-field"}>

                        <input id={"address"}
                               name="address" placeholder="Address" type="text" value={state.address}
                               autoComplete="address-level2" onChange={(e) => {
                            handleChange(e)
                        }}
                        />
                </div>


                <div className={"input-field"}>
                    <button className={"btn pink lighten-1 z-depth-0"}>Sign Up</button>
                </div>
                <div className={"red-text center"}>
                    {authError ? <p>{authError}</p> : null}
                </div>
            </form>
        </div>

    );

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);