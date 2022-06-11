import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";
import {connect, useSelector} from "react-redux";
import M from  'materialize-css/dist/js/materialize.min.js';
import NewUserLinks from "./NewUserLinks";
import {isLoaded} from "react-redux-firebase";

const Navbar = (props) => {
    const {auth,users,handle} = props;
    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    })

    // let links = auth.uid ? (users[handle].isNewUser ? <NewUserLinks profile={profile}/> :<SignInLinks profile={profile}/>) : <SignOutLinks/>
    const checkStore = useSelector(state => state.firestore.ordered.users)
    if (!isLoaded(checkStore) && auth.uid){
        return (<div>
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"/>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"/>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"/>
                    </div>
                </div>
            </div>
        </div>);
    }
    let links = <SignOutLinks/>;
    if(auth.uid){
        links = <SignInLinks profile={users[handle]}/>;
        if (users && users[handle].isNewUser){
            links = <NewUserLinks profile={users[handle]}/>;
        }
    }



  return(

      <nav className={"nav-wrapper orange darken-3"}>
          <div className={"container"}>
              <a href="" data-target="slide-out" className="sidenav-trigger show-on-medium-and-down right"><i
                  className="material-icons">menu</i></a>
              <Link to={"/"} className={"brand-logo left"}><img src={"/../../../img/tenelogo.png"} style={{height: '56px', padding: '0px', width: 'auto'}}/></Link>
              {links}
          </div>
      </nav>

  );
}
const mapStateToProps = (state) => {
  return{
      auth: state.firebase.auth,
      users: state.firestore.data.users,
      handle:state.auth.handle,
      isAdmin:state.auth.isAdmin
  }
}
export default connect(mapStateToProps)(Navbar);