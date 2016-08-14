import React from 'react';
import Item from './item';

export default class List extends React.Component {
  render() {
    // console.log(["List:render", this]);
    var nodes = this.props.messages.map(function(e) {
      return <Item author={e.name} text={e.message} key={e.creationDate}/>
    });
    return (
      <div className="list">
      <div>Chat messages: {this.props.messages.length}</div>
      { nodes }
      </div>
    );
  }
}
