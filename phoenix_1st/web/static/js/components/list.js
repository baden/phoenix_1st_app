import React from 'react';
import Item from './item';

export default class List extends React.Component {
  render() {
    var nodes = this.props.data.map(function(e) {
      return <Item author={e.author} key={e.id} text={e.text}/>
    });
    return (
      <div className="list">
      { nodes }
      </div>
    );
  }
}
