import React, {Component} from 'react';

import './style.scss';

import Cookies from 'js-cookie';

export default class User extends Component {
  constructor(props) {
    super(props);

    // let cookieUserInfo = JSON.parse(Cookies.get('userinfo'));
    // if (cookieUserInfo) {}
    this.state = {
      user:  JSON.parse(Cookies.get('userinfo'))
    };

    console.log('USER LOG');
    console.log(this.state.user);
  }

  componentWillMount = () => {}

  render() {
    // let currentUser = this.state.user;
    let {email, name, photoURL} = this.state.user;

    console.log(this.props);
    return (<div className="userbox">
      <div className="mini-profile-pic-wrapper">
        <div className="profile-pic">
          <img className="round-mini-profile-pic" src={photoURL} alt="Profile Pic" />
        </div>
        <div className="profile-status status-online"></div>
      </div>

      <div className="profile-detail-wrapper">
        <span class="username"><b>{name}</b></span>
        <span class="email">{email}</span>
      </div>

      <div className="function-button-wrapper">
        <div>
          <button className="btn" onClick={this.props.handleLogOut}>
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>


    </div>)
  }
}
