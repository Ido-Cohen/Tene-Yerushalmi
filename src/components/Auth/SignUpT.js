import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dropdown from "./Dropdown";

const valueForAdmin = [{
    value: false,
    label: 'בוגר'
},
    {
        value: true,
        label: 'מנהל'
    }]
const mahzor = [{value:1,label:1},{value:2,label:2}, {value:3,label:3},{value:4,label:4}, {value:5,label:5}];
const SignUpT = () => {
    const [input, setInput] = useState({isAdmin: '', noAdmin: ''});


    const handleDropdown = (event) => {
        console.log(event)
        setInput({
            isAdmin: event, noAdmin: event === false ? 'false' : 'true'
        })
    };
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full rounded-lg">
                    <h1 className="mb-8 text-3xl text-center">רישום משתמש חדש</h1>
                    <div className="float-right">
                        <Dropdown type={"סוג משתמש"} values={valueForAdmin} reference={handleDropdown}/>
                    </div>
                    <div className={'float left'}>
                        {input.noAdmin === 'false' ? <Dropdown type={"מחזור"} values={mahzor} /> : ''}
                    </div>
                    <input type="text" id={"email"}
                           className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="email"
                           placeholder="אמייל"/>
                    <input type="text" id={"firstName"}
                           className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                           name="firstName" placeholder="שם פרטי"/>
                    <input type="text" id={"lastName"}
                           className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="lastName"
                           placeholder="שם משפחה"/>
                    <input type="text" id={"phoneNumber"}
                           className="block border border-grey-light w-full p-3 rounded mb-4 text-right"
                           name="phoneNumber" placeholder="מספר טלפון"/>
                    <input type="text" id={"address"}
                           className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="address"
                           placeholder="כתובת מגורים"/>
                    <input type="text" id={"work"}
                           className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="work"
                           placeholder="עבודה"/>
                    <input type="password" id={"password"}
                           className="block border border-grey-light w-full p-3 rounded mb-4 text-right" name="password"
                           placeholder="סיסמה"/>
                    <button type="submit" id={"submit"}
                            className="w-full text-center py-3 rounded text-white bg-orange-400 hover:bg-orange-600 focus:outline-none my-1 text-center">יצירת
                        משתמש
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpT;
