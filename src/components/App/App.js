import React, {useState} from 'react';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import Route from "../Route";
import Login from "../Login/Login";
import useToken from "./useToken";


let user = '';
const App = () => {

    const onLoginUpdate=(term) =>{
        console.log(term);
       user = term;
    }
    const { token, setToken } = useToken();
    if(!token) {
        return <Login setToken={setToken} onSubmit={onLoginUpdate}/>
    }
    return (
        <div className="wrapper">
            <h1>שלום רב {user}</h1>
            <h1>טנא ירושלמי</h1>
            <Route path="/">
                <Dashboard/>
            </Route>
            <Route path="/preferences">
                <Preferences/>
            </Route>
        </div>
    );
};

export default App;