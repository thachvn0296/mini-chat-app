import React, {Component} from 'react';

import {Button} from 'reactstrap';

// import {removeVietnameseAccentAndLowercase} from '../../utils/stringFunctions';
// import {ToastContainer, toast} from 'react-toastify';

import './style.scss';

export default class Message extends Component {
  constructor(props) {
    super(props);
    console.log('Log in MESSAGE');
    console.log(this.props);
  }

  componentWillMount = () => {}

  render() {
    return (<div className="message">
      <span className="message__author">
        {this.props.message.userName}:
      </span>
      {this.props.message.message}
    </div>)
  }
}
