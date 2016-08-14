import React from 'react';
import Game from './game';
import { Renderer, Scene, Mesh, Object3D, PerspectiveCamera } from 'react-three';

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
      this.frameId = requestAnimationFrame(this.animate)
    }
    // this.state = ModelsStore.getSettings();
    // this.onChangeListener = this.onChange.bind(this);
  }

  // _onResize(){
  //   console.log("App._onResize");
  //   // ModelsAction.resize();
  // }

  componentDidMount() {
    this.animate();
    // window.addEventListener('resize', this.onWindowResize.bind(this), false);
    // ModelsStore.addChangeListener(this.onChangeListener);
    // window.addEventListener('resize', this._onResize);
    // ModelsAction.loadModel();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    // ModelsStore.removeChangeListener(this.onChangeListener);
    // window.removeEventListener('resize', this._onResize);
    window.removeEventListener('resize', this.onWindowResize);
  }

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
    var cameraprops = {position:{z: 1}};

    return (
      <Renderer width={this.state.width} height={this.state.height} pixelRatio={window.devicePixelRatio} >
        <Scene width={this.state.width} height={this.state.height} camera="maincamera">
          <PerspectiveCamera name="maincamera" {...cameraprops} />
          <Game time={this.state.time} width={this.state.width} height={this.state.height} />
        </Scene>
      </Renderer>
    );
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
