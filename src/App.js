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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifai_face = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifai_face.left_col *  width,
      topRow: clarifai_face.top_row *  height,
      rightCol: width - (clarifai_face.right_col *  width),
      bottomRow: height - (clarifai_face.bottom_row *  height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(
        (response) => this.displayFaceBox(
          this.calculateFaceLocation(response)
      )).catch(
          err => console.log(err)
      );
  }

  render() {
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
       <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl} />
      </div>
    );
  }  
}

export default App;
