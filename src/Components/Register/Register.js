import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
    }
  }

  onNameChange = (event) => {
    this.setState({registerName: event.target.value})
  } 

  onRegEmailChange = (event) => {
    this.setState({registerEmail: event.target.value})
  }

  onRegPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value})
  }

  onSubmitRegister = () => {
    console.log(this.state);
    fetch('http://0.0.0.0:8000/api/auth/register/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
      })
    })
    .then(resp => resp.json())
    .then(user => {
      if (user) {
        this.props.loadUser(user)
        this.props.onRouteChange('login');
        console.log(user);
      }
    })

  }

  render() {
    const { onRouteChange } = this.props;
    return ( 
      <article className="bg-card br2 ba b--black-10 mv4 w-75 h-100 center shadow-2">
        <main className="pa4 black-80 centered">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0 w-100">
              <legend className="f4 fw6 center">Register</legend>
              <div className="mt3">
                <label className="fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-white w-100" 
                  type="text" 
                  name="name"  
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                  onChange={this.onRegEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-white w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={this.onRegPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                onClick={this.onSubmitRegister} 
                className=" b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 db center w-100" 
                type="submit" 
                value="Register" 
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange("signin")} className="f6 link dim black dt center pointer">Already have an account? Sign in</p>
            </div>
          </form>
        </main>
      </article>
        
    );

  }
}

export default Register;