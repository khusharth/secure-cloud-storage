import React from 'react';
// import Tilt from 'react-tilt';
import cloud from './cloud.png';
import "./Logo.css";
const Logo = () => {
    return (
        <div className="center">
            <div className="logo-box">
                <img src={cloud} alt="cloud" />
            </div>
            {/* <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={cloud} alt="cloud" />
                </div>
            </Tilt> */}
        </div>
    );
}

export default Logo;