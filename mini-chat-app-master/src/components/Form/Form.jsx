import React, {Component} from "react";

import {Button} from "reactstrap";
import firebase from "firebase";
import Cookies from 'js-cookie';
import ScrollToBottom from 'react-scroll-to-bottom';
import Linkify from 'react-linkify';
import {Picker, emojiIndex} from 'emoji-mart';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';

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
      list: [],
      showEmojiPicker: false
    };
    this.messageRef = firebase.database().ref().child("messages");
    this.listenMessages();
  }

  toggleEmojiPicker() {
    this.setState({
      showEmojiPicker: !this.state.showEmojiPicker
    });
  }

  addEmoji(emoji) {
    const {message} = this.state;
    const text = `${message}${emoji.native}`;

    this.setState({message: text, showEmojiPicker: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({userName: nextProps.user.displayName});
    }
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSend() {

    if (this.state.message) {
      const {message} = this.state;

      if (message.trim() === '')
        return;

      var newItem = {
        userName: this.state.userName,
        message: this.state.message
      };
      console.log(newItem);
      this.messageRef.push(newItem);
      this.setState({message: ""});
    }
  }

  listenMessages() {
    this.messageRef.limitToLast(80).on("value", message => {
      let currentMessage = message
        ? Object.values(message.val())
        : [];
      this.setState({list: currentMessage});
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSend();
    }
  }

  handleInput(event) {
    const {value, name} = event.target;

    this.setState({[name]: value});
  }

  render() {
    const {showEmojiPicker} = this.state;

    return (<Linkify>
      <div className="form">
        <ScrollToBottom className="form-message">
          {this.state.list.map((message, index) => (<Message key={index} message={message}/>))}
        </ScrollToBottom>
        <div className="form-row">

          {
            showEmojiPicker
              ? (<div className="emoji-picker-wrapper">
                <Picker set="emojione" onSelect={this.addEmoji.bind(this)}/>
              </div>)
              : null
          }

          <button className="form-button form-emoji-picker" onClick={this.toggleEmojiPicker.bind(this)}>
            <i class="far fa-smile"></i>
          </button>

          <ReactTextareaAutocomplete className="form-input" name="newMessage" value={this.state.message} loadingComponent={() => <span>Loading</span>} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} placeholder="Compose your message and hit ENTER to send" trigger={{
              ':' : {
                dataProvider: token => emojiIndex.search(token).map(o => ({colons: o.colons, native: o.native})),
                component: ({
                  entity: {
                    native,
                    colons
                  }
                }) => (<div>{`${colons} ${native}`}</div>),
                output: item => `${item.native}`
              }
            }}/>

          <button className="form-button" onClick={this.handleSend.bind(this)}>
            <i className="fas fa-paper-plane"/>
          </button>
        </div>
      </div>
    </Linkify>);
  }
}
