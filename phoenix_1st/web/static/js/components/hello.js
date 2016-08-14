import React from 'react';
import styles from './hello.css';
import List from './list';
// import Channel from '../services/channel';
import {connect} from 'react-redux';
import {reveiveMessage} from '../actions';

// console.log("Channel", Channel);

// console.log("Wtf styles", styles);

var data1 = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var data2 = [
  {id: 1, author: "Денис Батрак", text: "Это взлом, всем стоять на месте!"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

// var initState

// class Hello extends React.Component {
var Hello = React.createClass({

  getInitialState: function() {
    // console.log("Hello.initial", this);
    // const {dispatch, channel} = this.props;
    return {
      name: this.props.name,
      message: "",
      data: data1
    };
  },

  // Not best variant,
  // look axample at
  // https://github.com/TFarla/react-phoenix-chat/blob/7093a3a324f6118d18f604054129a01a4c4eeef5/web/static/js/components/chat/dashboard.js

  componentDidMount: function() {
    var that = this;
    const store = this.context.store;
    // console.log(["Hello:mount", this, this.props.subscribe]);

    var channel = this.props.socket.channel("room:lobby", {token: "foo_bar"});
    // this.channel.on("new_msg", msg => console.log("Got message", msg) );
    channel.join()
      .receive("ok", ({messages}) => console.log("catching up", messages) )
      .receive("error", ({reason}) => console.log("failed join", reason) )
      .receive("timeout", () => console.log("Networking issue. Still waiting...") )

    channel.on("new_msg", msg => {
      console.log("Got message", msg);
      const dispatch = this.props.dispatch;
      // // dispatch();
      var msg = {
        name: msg.name,
        message: msg.body,
        creationDate: msg.timestamp
      };
      dispatch(reveiveMessage(msg));

    })

    that.setState({channel: channel});

    // store.subscribe(function() {
    //   console.log("State changed:", store.getState());
    //   // this.gotMessage();
    // });
    // setTimeout(() => {
    //   console.log("Boo");
    //   that.setState({data: data2});
    // }, 3000);
  },

  // gotMessage: function(m) {
  //   console.log(["====> got message???", m, this]);
  // },

  handleAuthorChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleMessageChange: function(e) {
    this.setState({message: e.target.value});
  },
  handleSendClick: function(e) {
    // console.log("send", this.state);
    var name = this.state.name;
    var message = this.state.message;
    this.state.channel.push("new_msg", {name: name, body: message}, 10000)
     .receive("ok", (msg) => console.log("created message", msg) )
     .receive("error", (reasons) => console.log("create failed", reasons) )
     .receive("timeout", () => console.log("Networking issue...") );
    // const dispatch = this.props.dispatch;
    // // dispatch();
    // var msg = {
    //   name,
    //   message,
    //   creationDate: new Date()
    // };
    // dispatch(reveiveMessage(msg));
    // console.log(["dispatch = ", dispatch, this]);
    this.setState({message: ""});
  },

  render: function() {
    const {messages} = this.props;
    // console.log(["Hello:render", this, messages]);
    return (
      <div>
        <h1 className={styles.title}>
          Hello, <span>{this.state.name}</span>!!!
        </h1>
        <List data={this.state.data} messages={messages}/>
        <p>
          Name:
          <input type="text"
            placeholder="Your name"
            value={this.state.author}
            onChange={this.handleAuthorChange}/>
          <input type="text"
            placeholder="Message"
            value={this.state.message}
            onChange={this.handleMessageChange}/>
          <input type="button"
            value="Send"
            onClick={this.handleSendClick} />
        </p>
      </div>
    );
  }
});
//

Hello.contextTypes = {
  store: React.PropTypes.object
  // dispatch: React.PropTypes.func
  // router: React.PropTypes.object
};

const select = (state) => {
  // console.log("Hello:select", state);
  return {
    channel: state.channel,
    messages: state.channel.messages
    // rooms: state.rooms,
    // activeRoom: state.activeRoom,
    // activeChannel: state.activeChannel
  }
}

export default connect(select)(Hello);
