import React from 'react';
import styles from './hello.css';

import List from './list';

console.log("Wtf styles", styles);

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

  render: function() {
    console.log("Hello.props = ", this);
    return (
      <div>
        <h1 className={styles.title}>
          Hello, <span>{this.state.name}</span>!!!
        </h1>
        <List data={this.state.data} />
        <p>Name: <input type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}/></p>
      </div>
    );
  }
});
//

export default Hello
