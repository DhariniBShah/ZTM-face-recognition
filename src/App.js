import React, { Component } from 'react';
import './App.css';

import Particles from 'react-particles-js';

import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition'

import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '7f580a07a6434a7cb822ee913db81d99'
});

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
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () =>{
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input).then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      console.log(err);
    }
  );
  }

  render(){
    return (
      <div className="App">
      <Particles
        className = 'particles' 
        params={particlesOptions} 
      />
       <Navigation />
       <Rank />
       <ImageLinkForm 
        onInputChange = {this.onInputChange} 
        onButtonSubmit = {this.onButtonSubmit}   
        />  
       <FaceRecognition imageUrl = {this.state.imageUrl} />
      </div>
    );
  }  
}

export default App;
