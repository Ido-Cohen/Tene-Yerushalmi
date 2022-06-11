import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Dashboard from "../Dashboard/DashboardT";
import Navbar from "../layout/Navbar";
import MessageDetails from "../Messages/MessageDetailsT";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import AddGroup from "../Auth/addGroup";
import CreateMessage from "../Messages/CreateMessage";
import Settings from "../Settings/Settings";
import MapDashboard from "../Maps/mapDashboard";
import ContactsList from  "../Contacts/contactListT";
import SignInT from "../Auth/SignInT";
import SignUpT from "../Auth/SignUpT";
import AddGroupT from "../Auth/addGroupT";
import CreateMessageT from "../Messages/CreateMessageT";
import ContactsListT from '../Contacts/contactListT'
import {Footer} from "flowbite-react";
import NewUserLandingPage from  "../Auth/NewUserLandingPage";
import ResetPassword from "../Auth/ResetPassword";
import DashboardT from "../Dashboard/DashboardT";
import UserDetails from "../Settings/userDetails";


const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route exact path={"/"} element={<DashboardT/>} />
                    <Route path={"/message/:id"} element={<MessageDetails/>} />
                    <Route path={"/userProfile/:id"} element={<UserDetails/>} />
                    <Route path={"/signin"} element={<SignInT/>} />
                    <Route path={"/signup"} element={<SignUpT/>} />
                    <Route path={"/add"} element={<AddGroupT/>} />
                    <Route path={"/create"} element={<CreateMessageT/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                    <Route path={"/maps"} element={<MapDashboard/>}/>
                    <Route path={"/contacts"} element={<ContactsListT/>}/>
                    <Route path={"/reset-password/new-user"} element={<NewUserLandingPage/>}/>
                    <Route path={"/forgot-password"} element={<ResetPassword/>}/>
                </Routes>
                <Footer className={"fixed bottom-0 left-0 w-full"}>
                    <Footer.Copyright
                        href="https://tenejlm.co.il/"
                        by="TeneJLM™"
                        year={2022}
                    />
                    <Footer.LinkGroup className="mt-3 flex-wrap items-center text-sm sm:mt-0 ">
                        <Footer.Link href="https://tenejlm.co.il/">
                            About
                        </Footer.Link>
                        <Footer.Link href="https://tenejlm.co.il/contacts/">
                            Contact
                        </Footer.Link>
                    </Footer.LinkGroup>
                </Footer>
            </div>
        </Router>

    );
};

export default App;