import React from 'react';
import Item from './item';

export default class List extends React.Component {
  render() {
    var nodes = this.props.data.map(function(e) {
      console.log("e", e);
      return <Item author={e.author} key={e.id} text={e.text}/>
    });
    console.log("nodes", nodes);
    return (
      <div className="list">
      { nodes }
      </div>
    );
  }
}
