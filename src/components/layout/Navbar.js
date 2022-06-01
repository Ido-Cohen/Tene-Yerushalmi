import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";
import {connect} from "react-redux";
import M from  'materialize-css/dist/js/materialize.min.js';

const Navbar = (props) => {
    const {auth,profile} = props;
    const links = auth.uid ? <SignInLinks profile={profile}/> : <SignOutLinks/>
    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    })

  return(

      <nav className={"nav-wrapper orange darken-3"}>
          <div className={"container"}>
              <a href="" data-target="slide-out" className="sidenav-trigger show-on-medium-and-down left"><i
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
      profile: state.firebase.profile
  }
}
export default connect(mapStateToProps)(Navbar);