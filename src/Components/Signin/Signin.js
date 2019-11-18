import React from 'react';
import './Signin.css';
import Axios from 'axios';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      signInCode: '',
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onCodeChange = (event) => {
    this.setState({signInCode: event.target.value})
  }

  onSubmitSignIn = () => {
    console.log(this.state);
    fetch('http://0.0.0.0:8000/api/auth/login/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.signInEmail,
        password: this.state.signInPassword,
        "2fa_token": this.state.signInCode,
      }),
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        this.props.onKeyReceive(data.key);
        console.log("key: " + data.key)
        localStorage.setItem("Token", data.key);
        console.log(data.key);
        window.location.reload(false);
      
    })
    this.props.onRouteChange('dashboard');
  }
  // onSubmitSignIn = () => {
  //   console.log(this.state);
  //   console.log("Hello");

  //   Axios.post('http://0.0.0.0:8000/api/auth/login/', {
  //     method: 'post',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       username: this.state.signInEmail,
  //       password: this.state.signInPassword,
  //       "2fa_token": "538803",
  //     }) //538803
  //   })
  //   .then(resp => resp.json())
  //   .then(data => {
  //     console.log("Login: ", data);
  //     if (data.status === "success") {
  //       this.props.onRouteChange('dashboard');
  //       this.props.onKeyReceive("Token " + data.key);
  //     }
  //     else {
  //       this.props.onRouteChange('signin');
  //     }
  //   })
  // }

  render() {
    const { onRouteChange } = this.props;
    return ( 
        <article className="bg-card br2 ba b--black-10 mv4 w-75 h-100 center shadow-2">
          <main className="pa4 black-80 centered">
            <form className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0 w-100">
                <legend className="f4 fw6 center">Sign In</legend>
                <div className="mt3">
                  <label className="fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-white w-100" 
                    type="text" 
                    name="email-address"  
                    id="email-address" 
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input 
                    className="b pa2 input-reset ba bg-transparent hover-bg-white w-100" 
                    type="password" 
                    name="password"  
                    id="password" 
                    onChange={this.onPasswordChange}
                  />
                </div>
                <div className="mt3">
                  <label className="fw6 lh-copy f6" htmlFor="code">2FA Code</label>
                  <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-white w-100" 
                  type="text" 
                  name="code"  
                  id="code"
                  onChange={this.onCodeChange}
                  />
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input className="mt2" type="checkbox" /> Remember me</label>
                <p onClick={() => onRouteChange("forget")} className="f6 link dim black fr pointer">Forgot your password?</p>
              </fieldset>
              <div className="">
                <input
                  onClick={this.onSubmitSignIn}  
                  className=" b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 db center w-100" 
                  type="submit" 
                  value="Sign in"
                  />
              </div>
              <div className="lh-copy mt3">
                <p onClick={() => onRouteChange("register")} className="f6 link dim black dt center pointer">Dont have an account? Sign up</p>
              </div>
            </form>
          </main>
        </article>   
    );
  }
}

export default Signin;