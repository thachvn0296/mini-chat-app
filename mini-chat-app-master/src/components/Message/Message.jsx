import React, {Component} from 'react';

import {Button} from 'reactstrap';
import Linkify from 'react-linkify';

// import {removeVietnameseAccentAndLowercase} from '../../utils/stringFunctions';
// import {ToastContainer, toast} from 'react-toastify';

import './style.scss';

export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {}

  render() {
    return (<div className="message">
      <span className="message__author">
        {this.props.message.userName}:
      </span>
      <Linkify>{this.props.message.message}</Linkify>
    </div>)
  }
}
