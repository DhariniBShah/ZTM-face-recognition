import React, { Component } from 'react';
import './App.css';

import Particles from 'react-particles-js';

import Navigation from './components/navigation/Navigation';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition'

const particlesJSON =
  {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 500
        }
      },
      "color": {
       "value" : [ "#03C8A8","#89D8D3","#74f2ce", "#e0fcf4"]
      },
      "shape": {
        "type": "edge",
        "stroke": {
          "width": 0,
          "color": "#fff"
        }
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true, 
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 50,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "size_min": 1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "color": "#ffffff",
        "opacity": 0.5,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "top", //none, top, top-right, right, bottom-right, bottom, bottom-left, left, top-left
        "random": false,
        "straight": false,
        "out_mode": "out", // out
        "attract": {
          "enable": true,
          "rotateX": 1000,
          "rotateY": 1000
        }
      }
    }
  }

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}  

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    })
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    const boxes = data.outputs[0].data.regions.map(box => {
      const box_info = box.region_info.bounding_box;
      return({
        top_row: box_info.top_row * height,
        bottom_row: height - box_info.bottom_row*height,
        right_col: width - box_info.right_col*width,
        left_col: box_info.left_col*width
      })
    })

    return boxes;
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ boxes: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://protected-dawn-20665.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(
        (response) => { 
          if(response) {
            fetch('https://protected-dawn-20665.herokuapp.com/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState( 
                Object.assign(this.state.user, { entries: count })
              )
            })
            .catch(
              err=> console.log(err)
            )
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        }).catch(
          err => console.log(err)
      );
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });    
  }

  render() {
  
    const { boxes, imageUrl, route, isSignedIn } = this.state;
    return (
      <div className="App">
      <Particles
        className = 'particles' 
        params={particlesJSON} 
      />
       <Navigation isSignedIn = { isSignedIn } onRouteChange = { this.onRouteChange } />
       { 
          route === 'home' ?
          <div>
            <Rank name = { this.state.user.name } entries = { this.state.user.entries } /> 
            <ImageLinkForm 
              onInputChange = { this.onInputChange } 
              onButtonSubmit = { this.onButtonSubmit }   
            />  
            <FaceRecognition 
              boxes = {boxes} 
              imageUrl = {imageUrl} />
          </div>
            : (
              route === 'signin' ?
              <SignIn loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }/> 
              :
              <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }/> 
            ) 
       }
      </div>
    );
  }  
}

export default App;
