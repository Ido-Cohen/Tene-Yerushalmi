import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dropdown from "./Dropdown";
import {Navigate} from "react-router";
import {signUp} from "../../store/actions/authActions";
import {connect} from "react-redux";

let params;
const valueForAdmin = [{
    value: false,
    label: 'בוגר'
},
    {
        value: true,
        label: 'מנהל'
    }]
const mahzor = [{value: 1, label: 1}, {value: 2, label: 2}, {value: 3, label: 3}, {value: 4, label: 4}, {
    value: 5,
    label: 5
}];
const SignUpT = (props) => {
    const {auth, authError} = props;
    const [state, setState] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        address: '',
        work: '',
        yearOfGraduate: '',
        isAdmin: '',
    });

    const handleAdminDropdown = (event) => {
        setState(prevState => ({
            ...prevState,
            'isAdmin':event !== false,
        }));
        // setInput(prevState => ({
        //     ...prevState,
        //     isAdmin: event, noAdmin: event === false ? 'false' : 'true'
        // }));
    };
    const handleYearDropdown = (event) => {
        setState(prevState => ({
            ...prevState,
            'isAdmin':false,
            'yearOfGraduate': event
        }));
    };
    const handleSubmit = (e, signUp) => {
        e.preventDefault();
        params = {
            email: state.email,
            name: state.firstName,
            from_name: 'Tene',
            password: state.password
        }
        // sendEmail();
        signUp(state);
    }
    const handleChange = (e) => {
        setState(prevState => ({
            ...prevState,
            'isAdmin': state.isAdmin,
            [e.target.id]: e.target.value
        }));
    }
    if (!auth.uid) {
        return <Navigate replace to={'/'}/>
    }
    return (
        <div className="bg-grey-lighter min-h-full flex flex-col py-12 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-1 ">
                <div className="bg-white px-1 py-8 rounded shadow-md text-black w-full rounded-lg">
                    <form className="mt-8 space-y-6" onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                        <h1 className="mb-8 text-3xl text-center">רישום משתמש חדש</h1>
                        <div className="float-right">
                            <Dropdown type={"סוג משתמש"} values={valueForAdmin} reference={handleAdminDropdown}/>
                        </div>
                        <div className={'float left'}>
                            {state.isAdmin === false ?
                                <Dropdown type={"מחזור"} values={mahzor} reference={handleYearDropdown}/> : ''}
                        </div>
                        <input type="text" id={"email"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="email"
                               placeholder="אמייל"
                               onChange={(e) => {
                                   handleChange(e)
                               }}/>
                        <input type="text" id={"firstName"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="firstName" placeholder="שם פרטי"
                               onChange={(e) => {
                                   handleChange(e)
                               }}/>
                        <input type="text" id={"lastName"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="lastName"
                               placeholder="שם משפחה"
                               onChange={(e) => {
                                   handleChange(e)
                               }}/>
                        <input type="text" id={"phoneNumber"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="phoneNumber" placeholder="מספר טלפון"
                               onChange={(e) => {
                                   handleChange(e)
                               }}/>
                        <input type="text" id={"address"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="address"
                               placeholder="כתובת מגורים"
                               onChange={(e) => {
                                   handleChange(e)
                               }}/>
                        <input type="text" id={"work"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="work"
                               placeholder="עבודה"
                               onChange={(e) => {
                                   handleChange(e)
                               }}/>
                        <input type="password" id={"password"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                               name="password"
                               placeholder="סיסמה"
                               onChange={(e) => {
                                   handleChange(e)
                               }}/>
                        <button type="submit" id={"submit"}
                                className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center">יצירת
                            משתמש
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUpT);
