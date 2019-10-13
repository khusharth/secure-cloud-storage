import React from 'react';
import scs from './scs.png';
import './Dashboard.css'

const Dashboard = ( {onRouteChange, fileSelectedHandler, fileUploadHandler} ) => {
    return(
        <div>
            <nav className="db dt-l w-100 border-box pa3 pb0 ph5-l">
                <a className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="#0" title="Home">
                    <img className="shadow-4 br3" src={scs} alt="scs" height="100"/>
                </a>
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <a className="link dim dark-gray f3 f3-l dib mr3 mr5-l" href="#0" title="Home">Profile</a>
                    <a className="link dim dark-gray f3 f3-l dib" href="#0" title="Contact" onClick={() => onRouteChange("signin")}>Logout</a>
                </div>
            </nav>
            <hr className='bg-light-blue' style={{height:'1px', border: 0}}/>
            <div className='w-100'>
                <div className='w-25 fl pa4'>
                <input type='file' onChange={(event) => fileSelectedHandler(event)} />
                    <a onClick={() => fileUploadHandler()} className="f4 no-underline shadow-4 grow br-pill ph5 pv2 mb2 dib black bg-white pointer" href="#0">+ Upload</a>

                </div>
                <div className='w-75 fl pa4'>
                    File
                </div>
            </div>
        </div>
    )
}

export default Dashboard;