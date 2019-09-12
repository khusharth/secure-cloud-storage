import React from 'react';

const TwoFA = ({ onRouteChange }) => {
  return ( 
    <article className="bg-card br2 ba b--black-10 mv4 w-75 h-100 center shadow-2">
      <main className="pa4 black-80 centered">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0 w-100">
            <legend className="f4 fw6 center">Two Factor Authentication</legend>
            <div className="mt3">
                <p className="f6 black dt center">Enter 2FA code from the App</p>
            </div>
            <div className="mt4">
              <label className="fw6 lh-copy f6" htmlFor="code">Code</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-white w-100" type="text" name="code"  id="code" />
            </div>
          </fieldset>
          <div className="">
            <input onClick={() => onRouteChange("signin")} className=" b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 db center w-100 mt3" type="submit" value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange("signin")} className="f6 link dim black dt center pointer">Back to Sign in</p>
          </div>
        </form>
      </main>
    </article>


      
  );
}

export default TwoFA;