import React, {Component} from "react";

import {Button} from "reactstrap";
import Cookies from 'js-cookie';

import User from "../../components/User";
import Form from "../../components/Form";

// import {removeVietnameseAccentAndLowercase} from '../../utils/stringFunctions';
// import {ToastContainer, toast} from 'react-toastify';

import firebase from "firebase";
import firebaseConfig from "../../config";

import "./style.scss";

firebase.initializeApp(firebaseConfig);

export default class MainApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: Cookies.get('userinfo')
    };
  }
  componentWillMount() {
    if (!this.state.user) {
      this.handleLogOut();
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });
    this.showCurrentUserProfile();
  }

  handleGoogleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      this.showCurrentUserProfile();
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  handleFacebookSignIn() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Facebook Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      this.showCurrentUserProfile();
    }).catch(error => {});
  }

  handleLogOut() {
    firebase.auth().signOut();
  }

  showCurrentUserProfile() {
    let user = firebase.auth().currentUser;
    let name,
      email,
      photoUrl,
      uid,
      emailVerified;

    if (user != null) {
      let userdata = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid
      };

      this.setState({userinfo: userdata});
      Cookies.set('userinfo', userdata, {expires: 7});
    }
  }

  render() {
    return (<div className="main-app">

      {
        !this.state.user
          ? (<div className="main-app--header">
            <div className="main-app--header-title">Mini Chat App</div>
            <div className="main-app--header-formbox--signin">
              <div className="main-app--header-formbox--desc">
                <i>
                  Please sign in via
                  <b> Google </b>
                  or
                  <b> Facebook </b>
                  account
                </i>
              </div>
              <button className="btn btn-signin" onClick={this.handleGoogleSignIn.bind(this)}>
                <i className="fab fa-google"/>
              </button>
              <button className="btn btn-signin" onClick={this.handleFacebookSignIn.bind(this)}>
                <i className="fab fa-facebook-f"/>
              </button>
            </div>
          </div>)
          : (<div className="main-app--authenticated container-fluid">
            <div className="main-app--header-formbox-userbox">
              <User handleLogOut={this.handleLogOut.bind(this)} userinfo={this.state.userinfo}/>
            </div>

            <div className="main-app--header-formbox-chatinput">
              <Form/>
            </div>

            <div className="main-app--header-formbox-leftpanel">
              List Users
            </div>
          </div>)
      }
    </div>);
  }
}
