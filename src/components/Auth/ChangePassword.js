import React, {Component, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {changePassword, setIsNewUser, signIn, signOut} from "../../store/actions/authActions";
import {Navigate} from "react-router";
import {createMessage} from "../../store/actions/messageActions";
import {firebaseConnect} from "react-redux-firebase";
// import firebase from "firebase/compat/app";

let passError = '';
const ChangePassword = (props) => {
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [currPassword, setCurrPassword] = useState('');
    const {authError,auth,users,setIsNewUser,signOut} = props;
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (isValidPassword){
            if (changePassword(currPassword, password1)){
                // console.log(users[auth.uid].isNewUser);
                setIsNewUser(auth.uid);
                // signOut();
                // setCurrPassword('');

            }else {
                passError = 'הקלדת סיסמא נוכחית שגויה';
                setCurrPassword('');
            }
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

    function currPasswordChange(e) {
        setCurrPassword(e.target.value)
    }

    return (
        // <div className={"container"}>
        //     <form className={"white right-align"} onSubmit={handleSubmit}>
        //         <h5 className={"grey-text text-darken-3"}>שינוי סיסמא</h5>
        //         <div className={"input-field"}>
        //             <label>הקלידו סיסמא נוכחית</label>
        //             <input type={"password"} id={"currPassword"} onChange={currPasswordChange}/>
        //         </div>
        //         <div className={"input-field"}>
        //             <label>בחרו סיסמא חדשה</label>
        //             <input type={"password"} id={"password1"} onChange={handleChange}/>
        //         </div>
        //         <div className={"input-field"}>
        //             <label>חיזרו על הסיסמא החדשה</label>
        //             <input type={"password"} id={"password2"} onChange={handleChange}/>
        //         </div>
        //         <div className={"red-text center"}>
        //             {passError.length !== 0 ? <p>{passError}</p> : null}
        //         </div>
        //         <div className={"input-field"}>
        //             <button className={`btn ${isValidPassword?'':'disabled'} orange lighten-1 z-depth-0`}>שינוי סיסמא</button>
        //         </div>
        //     </form>
        // </div>

        <div className="blue-grey-text min-h-full flex flex-col py-12 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 ">
                <div className="bg-blue px-1 py-8 rounded shadow-md text-black w-full rounded-lg">
                    <form className="mt-8 space-y-6">
                        <h2 className="mb-8 text-3xl text-center">שינוי סיסמה</h2>
                        <input type="text" id={"current_password"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="current_password"
                               placeholder="הקלידו סיסמה נוכחית"
                        />
                        <input type="text" id={"password"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="password" placeholder="בחרו סיסמה חדשה"
                        />
                        <input type="text" id={"confirm_password"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="confirm_password"
                               placeholder="חיזרו על הסיסמה חדשה"
                        />
                        <input type="text" id={"address"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="address"
                               placeholder="כתובת מגורים"
                        />
                        <input type="text" id={"work"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="work"
                               placeholder="עבודה"
                        />
                        <button type="submit" id={"submit"}
                                className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center">צור חשבון
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
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
    return {
        setIsNewUser: (uid) => dispatch(setIsNewUser(uid)),
        signOut: () => dispatch(signOut())
    }
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



export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);