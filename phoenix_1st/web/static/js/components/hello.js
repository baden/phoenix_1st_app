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
  getInitialState: () => {
    return {
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

  render: function() {
    console.log("Hello.props = ", this);
    return (
      <div>
        <h1 className={styles.title}>
          Hello, {this.props.name}!!!
        </h1>
        <List data={this.state.data} />
      </div>
    );
  }
});
//

export default Hello
