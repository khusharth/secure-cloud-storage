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
      filesOnServer: [],
      key: '',
      progress: 0,
      isLoading: false,
      user: {
        id: '',
        name: '',
        email: '',
      }
    }
  }

  componentDidMount() {
    console.log("key: " + this.state.key);
    console.log("Token: " + localStorage.getItem("Token"));

    // Checking for files o Server
    fetch('http://0.0.0.0:8000/api/file/show/', {
            method: "GET",
            headers: {
              Authorization: 'Token ' + localStorage.getItem("Token"),
            }

          })
          .then(response => response.json())
          .then(data =>{
            // console.log("File on server: " + JSON.stringify(data));
            this.setState({
              filesOnServer: data,
            })
            console.log("fos: " + this.state.filesOnServer);
            // for (var i = 0; i < this.state.filesOnServer.length; i++) {
            //   console.log(this.state.filesOnServer[i]['id'])
            // }

          })

    // Checking if token is present or not on every refresh
    if (localStorage.getItem("Token")) {
      console.log("if");
      this.onRouteChange("dashboard");
    }
    else {
      console.log("else");
      this.onRouteChange("signin");
     
    }
 }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.username,
      email: data.email,
    }
    })
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  onKeyReceive = (key) => {
    this.setState({key: key});
  }

  // To make post request for uploading file
  fileUploadHandler = () => {
    const fd = new FormData();
    const config = {
        method: "post",
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Token ' + localStorage.getItem("Token"),
      },
      onUploadProgress: (progressEvent) =>  
      {
        let percentCompleted =  Math.round( ((progressEvent.loaded) / progressEvent.total*100) / 2);
        this.setState({ progress: percentCompleted })
      }
    };
    fd.append('file', this.state.selectedFile)
    console.log(...fd, "state" + this.state.selectedFile);

    this.setState({isLoading: true}, () =>{
    Axios.post('http://0.0.0.0:8000/api/file/encrypt/', fd, config)
      .then(response => {
        this.setState({isLoading: false});
        console.log(response);
        if(response.status === 200) {
          console.log("200 statuss");
          window.location.reload(false);
        }
          
      })
      .catch((error) => {
        console.log("error fetching data (empty file)");
        this.setState({isLoading: false});
         // Server can't be reached!
      })
      
    })
      // console.log(this.state.key);
      
  }

  onLogout = () => {
    console.log(this.state.key);
    fetch('http://0.0.0.0:8000/api/auth/logout/', {
      method: 'post',
      headers: {'Authorization': 'Token ' + localStorage.getItem("Token")},
    })
    .then(res => res.json())
    .then(data => {
      if(data.detail) {
        this.onRouteChange('signin');
        localStorage.removeItem("Token");
        // localStorage.setItem("Token", '');
      }
      else {
        console.log("Did'nt get the reponse");
      }
    })
  }

  // checkKey = () => {
  //   if (this.state.key === null ) {
  //     this.onRouteChange('signin');
  //   }
  //   else {
  //     this.onRouteChange('dashboard');
  //   }
  // }

  render() {
    return (
      <div className="">
        {this.state.route === 'dashboard'
          ? <div>
              <Dashboard 
              onRouteChange={this.onRouteChange} 
              fileSelectedHandler={this.fileSelectedHandler} 
              fileUploadHandler={this.fileUploadHandler} 
              onLogout={this.onLogout} 
              filesOnServer={this.state.filesOnServer} 
              isLoading={this.state.isLoading}
              /> 
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
                  <Signin onRouteChange={this.onRouteChange} onKeyReceive={this.onKeyReceive}/>
              </div>
              : (this.state.route === 'twofa'
                ? <div className="w-50">
                    <TwoFA onRouteChange={this.onRouteChange}/>  
                  </div>
                : (this.state.route === 'register'
                  ? <div className="w-50">
                    <Register onRouteChange={this.onRouteChange} onKeyReceive={this.onKeyReceive} loadUser={this.loadUser}/>
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
