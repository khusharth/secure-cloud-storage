import React from 'react';


const Register = ({ onRouteChange }) => {
  return ( 
    <article className="bg-card br2 ba b--black-10 mv4 w-75 h-100 center shadow-2">
      <main className="pa4 black-80 centered">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0 w-100">
            <legend className="f4 fw6 center">Register</legend>
            <div className="mt3">
              <label className="fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-white w-100" type="text" name="name"  id="name" />
            </div>
            <div className="mt3">
              <label className="fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-white w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="">
            <input onClick={() => onRouteChange("register")} className=" b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 db center w-100" type="submit" value="Register" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange("signin")} className="f6 link dim black dt center pointer">Already have an account? Sign in</p>
          </div>
        </form>
      </main>
    </article>


      
  );
}

export default Register;