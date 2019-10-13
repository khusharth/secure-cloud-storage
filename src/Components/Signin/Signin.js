import React from 'react';
import './Signin.css';


const Signin = ({ onRouteChange }) => {
  return ( 
    <article className="bg-card br2 ba b--black-10 mv4 w-75 h-100 center shadow-2">
      <main className="pa4 black-80 centered">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0 w-100">
            <legend className="f4 fw6 center">Sign In</legend>
            <div className="mt3">
              <label className="fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-white w-100" type="password" name="password"  id="password" />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer"><input className="mt2" type="checkbox" /> Remember me</label>
            <p onClick={() => onRouteChange("forget")} className="f6 link dim black fr pointer">Forgot your password?</p>
          </fieldset>
          <div className="">
            <input onClick={() => onRouteChange("twofa")} className=" b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 db center w-100" type="submit" value="Next" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange("register")} className="f6 link dim black dt center pointer">Dont have an account? Sign up</p>
          </div>
        </form>
      </main>
    </article>


      
  );
}

export default Signin;