import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../layout/Navbar";
import MessageDetails from "../Messages/MessageDetails";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import CreateMessage from "../Messages/CreateMessage";
import Settings from "../Settings/Settings";
import MapDashboard from "../Maps/mapDashboard";
import ContactsList from  "../Contacts/contactList";


const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route exact path={"/"} element={<Dashboard/>} />
                    <Route path={"/message/:id"} element={<MessageDetails/>} />
                    <Route path={"/signin"} element={<SignIn/>} />
                    <Route path={"/signup"} element={<SignUp/>} />
                    <Route path={"/create"} element={<CreateMessage/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                    <Route path={"/maps"} element={<MapDashboard/>}/>
                    <Route path={"/contacts"} element={<ContactsList/>}/>
                </Routes>
            </div>
        </Router>

    );
};

export default App;