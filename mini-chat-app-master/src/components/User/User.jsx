import React, {Component} from 'react';

import './style.scss';

export default class User extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {}

  render() {
    // let currentUser = this.state.user;
    // // let {displayName, email, photoURL} = this.props.userinfo;
    console.log(this.props);
    return (<div className="userbox">
      <div className="mini-profile-pic-wrapper">
        <div className="profile-pic">
          <img className="round-mini-profile-pic" src="https://lh6.googleusercontent.com/-4b2-0KHrzXU/AAAAAAAAAAI/AAAAAAAADSE/T-CATZOokAY/photo.jpg" alt="Profile Pic" />
        </div>
        <div className="profile-status status-online"></div>
      </div>

      <div className="profile-detail-wrapper">
        <span class="username"><b>Chri sasd asda dsasdt</b></span>
        <span class="email">this.is.email@email.dev</span>
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
