// import React from 'react';
// import Tilt from 'react-tilt';
// import cloud from './cloud.png';
// import "./Logo.css";

// const Logo = () => {
//     return (
//         <div className="center">
//             <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
//                 <div className="Tilt-inner">
//                     <img src={cloud} alt="cloud" />
//                 </div>
//             </Tilt>
//         </div>
//     );
// }

// export default Logo;
import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import cloud from './cloud.png';

const Logo = () => {
    return (
        <div className="centered">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 80 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{padding: '6px'}} src={cloud} alt="Logo" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;