 import React from 'react';
import './App.css';
import Navigation from './navigation';
import Signin from './Signin/Signin';
import Register from './Register/Register';
import 'tachyons';
import Logo from './logo';
import Imagelinkform from './imagelinkform/imagelonkform';
import Clarifai from 'clarifai';
import Facerecognition from './facerecognition/facerecognition';
const app = new Clarifai.App({
 apiKey: 'ea8961082c3a48e88e70eeee9e107f9c'
});
class App extends React.Component{

  constructor(){
  	super();
  	this.state={
  		input:'',
  		imageUrl:'',
  		box:{},
  		route:'Signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries:0,
        joined: ''
      }
  	}
  }
  
  loaduser =(data) =>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined: data.joined
    }})
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange=(event)=>{
  	this.setState({input: event.target.value});
  }
  onSubmit= () =>{
  	this.setState({imageUrl: this.state.input});
  	console.log('click');
  	app.models
  	  .predict(
  	     Clarifai.FACE_DETECT_MODEL,
  	     this.state.input)
  	  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
   }
   onroutechange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn:false});
    }
    else if(route === 'home'){
      this.setState({isSignedIn:true});
    }
   	this.setState({route:route});
   }
 render(){
   return (
      <div className="App">
        <Navigation onroutechange={this.onroutechange} isSignedIn={this.isSignedIn}  />
            {this.state.route ==='home'
            ?<div>
              <Imagelinkform onInputChange= {this.onInputChange} onSubmit={this.onSubmit}/>
              <Logo />
              <Facerecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
             </div>
            : (
            this.state.route ==='Signin'
              ? <Signin onroutechange={this.onroutechange}/>
              : <Register loaduser={this.loaduser} onroutechange={this.onroutechange}/>
              )
           }   
    </div> 
    );    
 }

}

export default App;
