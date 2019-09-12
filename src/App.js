import React, {Component} from 'react';
import Signin from './Components/Signin/Signin'; 
import Register from './Components/Register/Register';
import TwoFA from './Components/TwoFA/TwoFA';
import Logo from './Components/Logo/Logo'; 
import Particles from 'react-particles-js';
import './App.css';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';

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
      route: "signin"
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="flex">
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
    );
  }
}

export default App;
