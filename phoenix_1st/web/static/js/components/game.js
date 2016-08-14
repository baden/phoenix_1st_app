import React from 'react';
// import ReactTHREE from 'react-three';
import THREE from 'three';

// import { Renderer, Scene, Mesh, Object3D, PerspectiveCamera } from 'react-three';
import { Mesh } from 'react-three';

// let Scene = ReactTHREE.Scene;
// let Camera = ReactTHREE.PerspectiveCamera;
// let AmbientLight = ReactTHREE.AmbientLight;
// let DirectionalLight = ReactTHREE.DirectionalLight;
// let Mesh = ReactTHREE.Mesh;

// import styles from './game.css';

// var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

var vertexShader = require('raw!./shaders/vertex_shader.glsl');
var fragmentShader = require('raw!./shaders/fragment_shader.glsl');

var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

class Game extends React.Component {

  // static displayName = 'Scene3D';

  constructor(props) {
    super(props);

    this.uniforms = {
      time: { type: "f", value: props.time },
      resolution: { type: "v2", value: new THREE.Vector2(props.width, props.height) }
    };

    // console.log(["Shaders", vertexShader, fragmentShader]);

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("shouldComponentUpdate?");
  //   return !nextProps.sliderBusy;
  // }

  componentWillReceiveProps(nextProps) {
    // console.log(["componentWillReceiveProps", nextProps]);
    this.uniforms.time.value = nextProps.time

    if(nextProps.width !== this.props.width)
      this.uniforms.resolution.value.x = nextProps.width;

    if(nextProps.height !== this.props.height)
      this.uniforms.resolution.value.y = nextProps.height;
  }

  render() {
    return <Mesh geometry={geometry} material={this.material} id={this.props.id}/>;
  }

  // render() {
  //   console.log('Threejs render scene');
  //   var aspectratio = this.props.width / this.props.height;
  //   var cameraprops = {fov : 75, aspect : aspectratio,
  //                          near : 1, far : 5000,
  //                          position : new THREE.Vector3(0,0,600),
  //                          lookat : new THREE.Vector3(0,0,0)};
  //   return (
  //     <Renderer width={this.props.width} height={this.props.height}>
  //       <Scene width={this.props.width} height={this.props.height} camera="maincamera">
  //         <PerspectiveCamera name="maincamera" {...cameraprops} />
  //         <Mesh geometry={geometry} material={this.material} />
  //       </Scene>
  //     </Renderer>
  //   );
  //
  //      //  <Cupcake {...this.props.cupcakedata} />
  //   // if(1){
  //   //   let scene = (
  //   //
  //   //     <Scene
  //   //       ref="scene"
  //   //       width={this.props.width}
  //   //       height={this.props.height}
  //   //       camera={'camera'}
  //   //       antialias={true}
  //   //       autoClear={true}
  //   //       transparent={true}
  //   //       shadowMapEnabled={true}
  //   //       shadowMapSoft={true}
  //   //       enableRapidRender={false}
  //   //       orbitControls={THREE.OrbitControls}
  //   //       background={0xffffff}
  //   //     >
  //   //       <Camera
  //   //         aspect={this.props.width / this.props.height}
  //   //         far={1000}
  //   //         fov={50}
  //   //         lookat={new THREE.Vector3(0, 0, 0)}
  //   //         name={'camera'}
  //   //         near={1}
  //   //         position={new THREE.Vector3(0, 300, 500)}
  //   //       />
  //   //       <AmbientLight
  //   //         color={new THREE.Color(0x333333)}
  //   //         intensity={0.5}
  //   //         target={new THREE.Vector3(0, 0, 0)}
  //   //       />
  //   //       <DirectionalLight
  //   //         color={new THREE.Color(0xFFFFFF)}
  //   //         intensity={1.5}
  //   //         position={new THREE.Vector3(0, 0, 60)}
  //   //       />
  //   //       <Mesh/>
  //   //     </Scene>
  //   //   );
  //   //   //console.log(this.refs.scene);
  //   //   return scene;
  //   // } else {
  //   //   return <div>Scene {this.props.width}x{this.props.height}</div>;
  //   // }
  // }
}

// <World
//   model={this.props.model}
//   position={new THREE.Vector3(0, 0, 0)}
//   scale={this.props.scale}
//   visible={true}
// />

Game.propTypes = {
  // model: React.PropTypes.instanceOf(ParsedModel),
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default Game;
