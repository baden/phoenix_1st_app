import React from 'react';
// import ReactDOM from 'react-dom';
import THREE from 'three';
// import ReactTHREE from 'react-three';
// const Mesh = ReactTHREE.Mesh;
import { Mesh } from 'react-three';


var Cube = React.createClass({
  displayName: 'Cube',
  getInitialState: function() {
    return {
      color: 0xdd0000
    };
  },
  render: function() {
    const cubeProps = Object.assign({
      material: new THREE.MeshPhongMaterial( { color: this.state.color, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ),
      geometry: new THREE.BoxGeometry( 100, 100, 100),
      onClick3D: function() {
        // console.log('clicked', this);
        var new_color = Math.floor(Math.random() * 0xffffff);
        this.setState({color: new_color});
        // this.history.pushState(null, `/panoramas/${this.props.id}`);
      }.bind(this),
      onMouseMove3D: function() {
        // console.log('move');
        // var new_color = Math.floor(Math.random() * 0xffffff);
        // this.setState({color: new_color});
      }.bind(this)
    }, this.props);
    // console.log(["cubeProps = ", cubeProps]);

    return <Mesh {...cubeProps} />;
  }
});

export default Cube;
