import React, {Component, useState} from 'react';
import {connect} from "react-redux";
import {signIn} from "../../store/actions/authActions";
import {Navigate} from "react-router";

let passError = '';
const NewUserLandingPage = (props) => {
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        if (isValidPassword){

        }
    }
    function handleChange(e) {
        let pass1 = password1;
        let pass2 = password2;
        if (e.target.id === 'password1'){
            setPassword1(e.target.value);
            pass1 = e.target.value;
        }
        else {
            setPassword2(e.target.value);
            pass2 = e.target.value;
        }
        if (!passwordValidation(pass1)) {
            setIsValidPassword(false);
        }else if (pass1 !== pass2){
            setIsValidPassword(false);
            passError ='הסיסמא חייבת להיות זהה';
        }else {
            setIsValidPassword(true);
            passError ='';
        }
    }
    return (
        <div className={"container"}>
            <form className={"white right-align"} onSubmit={handleSubmit}>
                <h5 className={"grey-text text-darken-3"}>בחירת סיסמא</h5>
                <div className={"input-field"}>
                    <label htmlFor={"title"} >בחר סיסמא חדשה</label>
                    <input type={"password"} id={"password1"} onChange={handleChange}/>
                </div>
                <div className={"input-field"}>
                    <label htmlFor={"content"}>בחר סיסמא חדשה</label>
                    <input type={"password"} id={"password2"} onChange={handleChange}/>
                </div>
                <div className={"red-text center"}>
                    {passError.length !== 0 ? <p>{passError}</p> : null}
                </div>
                <div className={"input-field"}>
                    <button className={`btn ${isValidPassword?'':'disabled'} orange lighten-1 z-depth-0`}>שינוי סיסמא</button>
                </div>
            </form>
        </div>
    );
}

function passwordValidation(password) {

    //minimum password length validation
    if(password.length < 6) {
        passError ='הסיסמא חייבת להכיל לפחות 6 תווים';
        return false;
    }

    //maximum length of password validation
    if(password.length > 12) {
        passError ='הסיסמא חייבת להכיל עד 12 תווים';
        return false;
    }
    return true;
}

export default NewUserLandingPage;