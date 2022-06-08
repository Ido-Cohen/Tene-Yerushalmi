import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../layout/Navbar";
import MessageDetails from "../Messages/MessageDetails";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AddGroup from "../Auth/addGroup";
import CreateMessage from "../Messages/CreateMessage";
import Settings from "../Settings/Settings";
import MapDashboard from "../Maps/mapDashboard";
import ContactsList from  "../Contacts/contactList";
import SignInT from "../Auth/SignInT";
import SignUpT from "../Auth/SignUpT";
import AddGroupT from "../Auth/addGroupT";
import CreateMessageT from "../Messages/CreateMessageT";
import ContactsListT from '../Contacts/contactListT'


const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route exact path={"/"} element={<Dashboard/>} />
                    <Route path={"/message/:id"} element={<MessageDetails/>} />
                    <Route path={"/signin"} element={<SignInT/>} />
                    <Route path={"/signup"} element={<SignUpT/>} />
                    <Route path={"/add"} element={<AddGroupT/>} />
                    <Route path={"/create"} element={<CreateMessageT/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                    <Route path={"/maps"} element={<MapDashboard/>}/>
                    <Route path={"/contacts"} element={<ContactsListT/>}/>
                </Routes>
            </div>
        </Router>

    );
};

export default App;