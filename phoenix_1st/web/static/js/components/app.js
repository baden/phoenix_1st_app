import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import Cube from './cube';
import THREE from 'three';
import { Renderer, Scene, Mesh, Object3D, PerspectiveCamera, AmbientLight, DirectionalLight } from 'react-three';
import _ from 'lodash';
// import OrbitControls from '../../lib/OrbitControls';
import OrbitControls from './OrbitControls';


// import ModelsStore from '../stores/models_store';
// import ModelsAction from '../actions/models_action';
// import Stats from './stats.react';
// import Scene3D from './three/scene.react';

/* main react component, the only component with state */

class App extends React.Component{

  static displayName = 'App';

  constructor(props){
    super(props);

    this.state = {
      time: 1.0,
      width: 256,
      height: 256
    };
    this.animate = () => {
      this.setState({
        time: this.state.time + 0.05
      })
      // this.frameId = requestAnimationFrame(this.animate)
    }
    // this.state = ModelsStore.getSettings();
    // this.onChangeListener = this.onChange.bind(this);
    // this._orbitControlsHandler = this._onControllerChange.bind(this);
  }

  // _onResize(){
  //   console.log("App._onResize");
  //   // ModelsAction.resize();
  // }

  componentDidMount() {
    this.animate();
    // console.log(["init OrbitControls", this, canvas]);
    // console.log(["this.refs.scene=", this.refs.renderer._THREErenderer.domElement]);
    // var canvas = document.querySelector( 'canvas' );
    // Грязный хак, тут явно что-то не чисто
    console.log("this=", this);
    // var domNode = this.getDOMNode();
    // var domNode = this.refs.renderer.getDOMNode();
    // console.log("domNode=", domNode);
    var canvas = this.refs.renderer._THREErenderer.domElement;
    // let canvas = ReactDOM.findDOMNode(this.refs.scene);
    console.log(["canvas=", canvas]);
    this._camera = this.refs.camera;
    this._orbitControls = new OrbitControls(this._camera, canvas);
    // this._orbitControls.addEventListener('change', this._orbitControlsHandler, false);
    // this.controls = new OrbitControls(this.refs.camera);
    // this.controls = new OrbitControls(this, canvas);
    // window.addEventListener('resize', this.onWindowResize.bind(this), false);
    // ModelsStore.addChangeListener(this.onChangeListener);
    // window.addEventListener('resize', this._onResize);
    // ModelsAction.loadModel();
  }

  componentWillUnmount() {
    // this._orbitControls.removeEventListener('change', this._orbitControlsHandler, false);
    cancelAnimationFrame(this.frameId);
    // ModelsStore.removeChangeListener(this.onChangeListener);
    // window.removeEventListener('resize', this._onResize);
    window.removeEventListener('resize', this.onWindowResize);
  }

  // _onControllerChange(e){
  //     // SettingsAction.updateCamera({
  //     //   position: this._camera.position,
  //     //   quaternion: this._camera.quaternion
  //     // });
  // }

  onWindowResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  // onChange(){
    // let state = ModelsStore.getSettings();
    // this.setState(state);
  // }

  render(){
    const initialQ = new THREE.Quaternion();

    var width = this.state.width;
    var height = this.state.height;

    var renderProps = {
      width: width,
      height: height,
      pixelRatio: window.devicePixelRatio,
      antialias: true,
      preserveDrawingBuffer: true
    };


    var sceneProps = {
      width: width,
      height: height,
      quaternion: initialQ,
      camera: 'maincamera',
      pointerEvents: ['onClick', 'onMouseMove']
    };
    var aspectRatio = width / height;
    // var cameraprops = {position:{z: 1}};
    var cameraProps = {
      fov: 75,
      aspect: aspectRatio,
      near: 1,
      far: 10000,
      position: new THREE.Vector3(0, -240, 300),
      lookat: new THREE.Vector3(0, 0, 0)
    };

    var ambientLightProps = {
      color: new THREE.Color(0x333333),
      intencity: 0.8,
      target: new THREE.Vector3(0, 0, 0)
    };

    const directionalLightProps = {
      color: new THREE.Color(0x808080),
      intencity: 0.1,
      position: new THREE.Vector3(-120, -50, 160)
    };

    var pos = new THREE.Vector3(0, 0, 0);

    // function getPosition(id) {
    //   const sign = Math.random() * 2 > 1 ? 1 : -1;
    //   return Math.floor(Math.random() * 200) * sign;
    // }

    // <Game time={this.state.time} width={this.state.width} height={this.state.height} />
    return (
      <Renderer ref="renderer" {...renderProps}>
        <Scene ref="scene" {...sceneProps}>
          {
            _.map(_.range(0,64), function(id) {
              let ix = id % 8;
              let iy = id / 8 | 0;
              let x = ix * 100 - 300;
              let y = iy * 100 - 150;
              let z = 0;//Math.floor(Math.random() * 100) - 100;
              var pos = new THREE.Vector3(x, y, z);
              return <Cube position={pos} id={id} key={id}/>
            })
          }
          {
            //<Cube position={pos}/>
          }

          <PerspectiveCamera ref="camera" name="maincamera" {...cameraProps} />
          <AmbientLight {...ambientLightProps} />
          <DirectionalLight {...directionalLightProps} />
        </Scene>
      </Renderer>
    );
    // return (
    //   <Renderer width={this.state.width} height={this.state.height} pixelRatio={window.devicePixelRatio} >
    //     <Scene width={this.state.width} height={this.state.height} camera="maincamera">
    //       <PerspectiveCamera name="maincamera" {...cameraprops} />
    //       <Game time={this.state.time} width={this.state.width} height={this.state.height} />
    //     </Scene>
    //   </Renderer>
    // );
    // <Cube position={pos} id={2} key={2}/>
    // <Game time={this.state.time} width={this.state.width} height={this.state.height} id={1} key={1}/>
    // <Cube position={pos} id={2} key={2}/>

    // return(
    //   <div>
    //     <Game
    //       width={this.state.width}
    //       height={this.state.height}
    //       model={this.state.model}
    //     />
    //   </div>
    // );
  }
}

App.propTypes = {};

export default App;
