import React                from 'react';
import { connect }          from 'react-redux';

class View1 extends React.Component {
  render() {
    return (
      <div className="view-container boards index">
        View1
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  state.boards
);

export default connect(mapStateToProps)(View1);
