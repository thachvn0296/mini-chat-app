import React, { Component } from "react";

import { Button } from "reactstrap";
import firebase from "firebase";

// import {removeVietnameseAccentAndLowercase} from '../../utils/stringFunctions';
// import {ToastContainer, toast} from 'react-toastify';

import "./style.scss";

import Message from "../Message";

export default class Form extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      userName: "Mock",
      message: "",
      list: []
    };
    this.messageRef = firebase
      .database()
      .ref()
      .child("messages");
    console.log(this.messageRef);
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
      console.log("--listenMessages log");
      console.log(message.val());

      let currentMessage = message ? Object.values(message.val()) : [];

      this.setState({
        list: currentMessage
      });
      console.log('Listened Message');
      console.log(this.state.list);
    });
  }

  render() {
    console.log(this.state.list);
    return (
      <div className="form">
        <div className="form-message">
          {this.state.list.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
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
    );
  }
}
