import React from 'react';
import styles from './hello.css';
import List from './list';
import Channel from '../services/channel'

console.log("Channel", Channel);

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
  // componentDidMount() {
  //   // const { data } = data;
  //   this.props.data = data;
  //   console.log("Hello.mount");
  // }
  getInitialState: function() {
    console.log("Hello.initial", this);
    return {
      name: this.props.name,
      message: "",
      data: data1
    };
  },

  componentDidMount: function() {
    var that = this;
    setTimeout(() => {
      console.log("Boo");
      that.setState({data: data2});
    }, 3000);
  },

  handleAuthorChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleMessageChange: function(e) {
    this.setState({message: e.target.value});
  },
  handleSendClick: function(e) {
    console.log("send", this.state.message);
    var name = this.state.name;
    var message = this.state.message;
    Channel.send(name, message);
    this.setState({message: ""});
  },

  render: function() {
    return (
      <div>
        <h1 className={styles.title}>
          Hello, <span>{this.state.name}</span>!!!
        </h1>
        <List data={this.state.data} />
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

export default Hello
