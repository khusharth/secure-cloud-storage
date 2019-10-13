import React, {Component} from 'react';
import Signin from './Components/Signin/Signin'; 
import Register from './Components/Register/Register';
import TwoFA from './Components/TwoFA/TwoFA';
import Logo from './Components/Logo/Logo'; 
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Dashboard from './Components/Dashboard/Dashboard';
import Particles from 'react-particles-js';
import './App.css';
import Axios from 'axios';


const particlesOptions = {
  "particles": {
      "number": {
          "value": 70
      },
      "size": {
          "value": 2
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "signin",
      selectedFile: null
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  // To make post request for uploading file
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    Axios.post('https://us-central1-fb-cloud-functions-demo.cloudfunctions.net/uploadFile',fd)
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className="">
        {this.state.route === 'dashboard'
          ? <div>
              <Dashboard onRouteChange={this.onRouteChange} fileSelectedHandler={this.fileSelectedHandler} fileUploadHandler={this.fileUploadHandler}/> 
            </div>

          : <div className="w-100 flex">
              <div className="w-50">
                <Particles className="particles"
                  params={ particlesOptions }
                  /> 
                <Logo />
              </div>
              {this.state.route === 'signin' 
              ? <div className="w-50">
                  <Signin onRouteChange={this.onRouteChange}/>
              </div>
              : (this.state.route === 'twofa'
                ? <div className="w-50">
                    <TwoFA onRouteChange={this.onRouteChange}/>  
                  </div>
                : (this.state.route === 'register'
                  ? <div className="w-50">
                    <Register onRouteChange={this.onRouteChange}/>
                  </div>
                  : <div className="w-50">
                      <ForgetPassword onRouteChange={this.onRouteChange}/>
                    </div>
                  )
                )
              }
            </div>
          }
      </div>
    );
  }
}

export default App;
