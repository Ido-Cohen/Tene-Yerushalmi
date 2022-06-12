import React, {useEffect, useState} from 'react';
import Dropdown from "./Dropdown";
import {Navigate} from "react-router";
import {signUp} from "../../store/actions/authActions";
import {connect} from "react-redux";
import axios from "axios";
import {PlacesAutoComplete} from "../Maps/mapDashboard";

const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const passwordLength = 6;
const valueForAdmin = [{
    value: false,
    label: 'בוגר'
},
    {
        value: true,
        label: 'מנהל'
    }]
const SignUpT = (props) => {

    const {auth, authError,isAdmin} = props;
    const [yearData, setYearData] = useState(null);
    const [selected, setSelected] = useState();
    const [selectedAddress, setSelectedAddress] = useState();
    const [state, setState] = useState({
        email: '',
        password: generatePassword(),
        phoneNumber: '',
        firstName: '',
        lastName: '',
        address: '',
        geoAddress: '',
        work: '',
        yearOfGraduate: '',
        isAdmin: '',
        isNewUser: true,
        isNewYear: false
    });

    async function getYear() {
        const response = await axios.get('/getallyears');
        setYearData(response.data);
    }
    if (!yearData){
        getYear().then(res => {
            console.log(res);
        });
    }
    const handleAdminDropdown = (event) => {

        setState(prevState => ({
            ...prevState,
            'isAdmin': event !== false,
            'isNewYear': false
        }));

    };
    const handleYearDropdown = (event) => {
        setState(prevState => ({
            ...prevState,
            'isAdmin': false,
            'yearOfGraduate': event === 'חדש' ? '' : event,
            'isNewYear': event === 'חדש'
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/signup", state)
            .then((res) => {
                console.log(res)
                axios.post('/sendemail',{email:state.email,password: state.password}).then(email => {
                    console.log("email sent successfully")
                })
            }).catch(err => {
            console.log(err);
        })
    }
    const handleChange = (e) => {
        setState(prevState => ({
            ...prevState,
            'isAdmin': state.isAdmin,
            'handle': state?.email.substring(0, state?.email.lastIndexOf("@")),
            [e.target.id]: e.target.value
        }));
    }
    if (!auth.uid || !isAdmin) {
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
                            {state.isAdmin === false && yearData ?
                                <Dropdown type={"מחזור"} values={yearData} reference={handleYearDropdown}/> : ''}
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
                        <PlacesAutoComplete setSelected={setSelected} setSelectedAddress={setSelectedAddress} setState={setState}/>
                        <input type="text" id={"work"}
                               className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="work"
                               placeholder="עבודה"
                               onChange={(e) => {
                                   handleChange(e)
                               }}/>
                        {state.isNewYear ? <input type="text" pattern="[0-9]*"
                                                  className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                                                  placeholder="מספר מחזור חדש" required value={state.yearOfGraduate}
                                                  id={"yearOfGraduate"}
                                                  onChange={(e) => setState(prevState => ({
                                                      ...prevState,
                                                      'yearOfGraduate': e.target.value.replace(/\D/, '')
                                                  }))}/> : ''}

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
        authError: state.auth.authError,
        isAdmin: state.auth.isAdmin
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpT);

function generatePassword() {
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}
