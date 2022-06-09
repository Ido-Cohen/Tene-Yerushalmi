import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";
import {connect} from "react-redux";
import M from  'materialize-css/dist/js/materialize.min.js';
import NewUserLinks from "./NewUserLinks";

const Navbar = (props) => {
    const {auth,profile,users,handle} = props;
    // let links = auth.uid ? (users[handle].isNewUser ? <NewUserLinks profile={profile}/> :<SignInLinks profile={profile}/>) : <SignOutLinks/>
    let links = <SignOutLinks/>;
    if(auth.uid){
        links = <SignInLinks profile={profile}/>;
        if (users && users[handle].isNewUser){
            links = <NewUserLinks profile={profile}/>;
        }
    }
    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    })

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
      profile: state.firebase.profile,
      users: state.firestore.data.users,
      handle:state.auth.handle
  }
}
export default connect(mapStateToProps)(Navbar);