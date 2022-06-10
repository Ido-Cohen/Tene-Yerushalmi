import React, {Component, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {changePassword, setIsNewUser, signIn, signOut} from "../../store/actions/authActions";
import {Navigate} from "react-router";
import {createMessage} from "../../store/actions/messageActions";
import {firebaseConnect} from "react-redux-firebase";
import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api'
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {PlacesAutoComplete} from "../Maps/mapDashboard";
// import firebase from "firebase/compat/app";

let passError = '';
const ChangePassword = (props) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries : ['places']

    })
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [currPassword, setCurrPassword] = useState('');
    const [selected, setSelected] = useState();
    const {authError,auth,users,setIsNewUser,signOut,handle} = props;
    if (!isLoaded) return <div>Loading...</div>;
    if (!auth.uid) {
        return <Navigate replace to={'/signin'}/>
    }

    function handleSubmit(e) {
        console.log("here");
        e.preventDefault();
        if (isValidPassword){
            axios.post('/updateuser',{handle:handle,password:password1 ,address:selected}).then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
                passError = 'הקלדת סיסמא נוכחית שגויה';
                console.log("failed")
            });
                // console.log(users[auth.uid].isNewUser);
                // signOut();
                // setCurrPassword('');



                // setCurrPassword('');

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

        <div className="blue-grey-text min-h-full flex flex-col py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 ">
                <div className="bg-blue px-1 py-8 rounded shadow-md text-black w-full rounded-lg bg-white/90">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <h2 className="mb-8 text-3xl text-center">שינוי סיסמה</h2>
                        <input type="password" id={"currPassword"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="current_password"
                               placeholder="הקלידו סיסמה נוכחית"
                               onChange={currPasswordChange}
                        />
                        <input type="password" id={"password1"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="password" placeholder="בחרו סיסמה חדשה"
                               onChange={handleChange}
                        />
                        <input type="password" id={"password2"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="confirm_password"
                               placeholder="חיזרו על הסיסמה חדשה"
                               onChange={handleChange}
                        />

                            <PlacesAutoComplete setSelected={setSelected}/>
                        <input type="text" id={"work"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="work"
                               placeholder="עבודה"
                        />
                        <div className={"red-text center"}>
                            {passError.length !== 0 ? <p>{passError}</p> : ''}
                        </div>
                        <button type="button" id={"submit"} onClick={handleSubmit}
                                className={`w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center ${isValidPassword ? '' : 'disabled'}`}>צור חשבון
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
        users: state.firestore.data.users,
        handle:state.auth.handle
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