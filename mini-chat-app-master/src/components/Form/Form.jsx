import React, { Component } from "react";

import { Button } from "reactstrap";
import firebase from "firebase";
import Cookies from 'js-cookie';
import ScrollToBottom from 'react-scroll-to-bottom';
import Linkify from 'react-linkify';

// import {removeVietnameseAccentAndLowercase} from '../../utils/stringFunctions';
// import {ToastContainer, toast} from 'react-toastify';

import "./style.scss";

import Message from "../Message";

export default class Form extends Component {
  constructor(props) {
    super(props);
    let cookieUserInfo = JSON.parse(Cookies.get('userinfo'));

    this.state = {
      userName: cookieUserInfo.name,
      message: "",
      list: []
    };
    this.messageRef = firebase
      .database()
      .ref()
      .child("messages");
    this.listenMessages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({ userName: nextProps.user.displayName });
    }
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message
      };
      console.log(newItem);
      this.messageRef.push(newItem);
      this.setState({ message: "" });
    }
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }

  listenMessages() {
    this.messageRef.limitToLast(80).on("value", message => {
      let currentMessage = message ? Object.values(message.val()) : [];

      this.setState({
        list: currentMessage
      });
    });
  }

  render() {
    return (
      <Linkify>
        <div className="form">
          <ScrollToBottom className="form-message">
            {this.state.list.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </ScrollToBottom>
          <div className="form-row">
            <input
              className="form-input"
              type="text"
              placeholder="Type message"
              value={this.state.message}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
            <button className="form-button" onClick={this.handleSend.bind(this)}>
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </div>
      </Linkify>
    );
  }
}
