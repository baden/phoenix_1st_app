import React from 'react';
import styles from './hello.css';

import List from './list';

console.log("Wtf styles", styles);

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];


class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1 className={styles.title}>
          Hello, {this.props.name}!!!
        </h1>
        <List data={data} />
      </div>
    );
  }
}
//

export default Hello
