import React, {useState} from "react";
import PropTypes from "prop-types";
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

const Login = ({setToken,onSubmit}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        onSubmit(username);
        if (username === 'elad'){
            const token = await loginUser({
                username,
                password
            });
            setToken(token);
            window.history.pushState({},'','/dashboard');
        }
    }
    return(
        <div className={"login-wrapper"}>
            <h1>Please Login</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Login;
