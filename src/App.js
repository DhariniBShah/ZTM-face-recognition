import React, { Component } from 'react';
import './App.css';

import Particles from 'react-particles-js';

import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';

const particlesOptions = {
  particles: {
    number:{
      value: 80,
      density: {
        enable: true,
        value_area: 400
      }
    },
    size:{
      value: 2
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 10
      }
    }  
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: ''
    }
  }
  render(){
    return (
      <div className="App">
      <Particles
        className = 'particles' 
        params={particlesOptions} 
      />
       <Navigation />
       <Rank/>
       <ImageLinkForm />  
       {/*<FaceRecognition />*/}
      </div>
    );
  }  
}

export default App;
