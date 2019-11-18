import React from 'react';
import scs from './scs.png';
import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          filePath: '',
          isDownloading: false,
          pathReceived: false,
      }
    }

    deleteFile = (idd) => {
        fetch('http://0.0.0.0:8000/api/file/delete/', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem("Token"),
            },
            body: JSON.stringify({id: idd})
          })
          .then(resp => resp.json())
          .then(data => {
              console.log(data)
            window.location.reload(false);
          });

         

    } 
    downloadFile = (idd) => {
        console.log("id " + JSON.stringify(idd));

        this.setState({isDownloading: true}, () =>{
        fetch('http://0.0.0.0:8000/api/file/decrypt/', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + localStorage.getItem("Token"),
            },
            body: JSON.stringify({id: idd})
          })
          .then(resp => resp.json())
          .then(data => {
              this.setState({isDownloading:false})
                if(data) {
                    this.setState({
                        filePath: data.path,
                        pathReceived: true,
                    }, () => {
                                fetch(`http://0.0.0.0:8000${this.state.filePath}` , {
                                    method: "get",
                                })
                                .then(resp => resp.blob())
                                .then((blob) => {
                                    const url = window.URL.createObjectURL(new Blob([blob]));
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.setAttribute('download', `${this.state.filePath}`);

                                    document.body.appendChild(link);
                                    link.click();
                                    link.parentNode.removeChild(link);
                                })
                             }
                    )

                    console.log(this.state.filePath);
                    }
                
        })
        .catch((error) => {
            console.log("error downloading file...");
            console.log(error);
            this.setState({isDownloading: false});
             // Server can't be reached!
          })
    })

        // if(this.state.pathReceived)
        // {
            
        // }
        // else
        // {
        //     console.log("Path not received");
        // }
    }

    render() {
    const {onLogout, fileSelectedHandler, fileUploadHandler, isLoading} = this.props;
    const filesOnServer = this.props.filesOnServer || [];

    return(
        <div>
            <nav className="db dt-l w-100 border-box pa3 pb0 ph5-l">
                <a className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" href="#0" title="Home">
                    <img className="shadow-4 br3" src={scs} alt="scs" height="100"/>
                </a>
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <a className="link dim dark-gray f3 f3-l dib mr3 mr5-l" href="#0" title="Home">Profile</a>
                    <a className="link dim dark-gray f3 f3-l dib" href="#0" title="Contact" onClick={() => onLogout()}>Logout</a>
                </div>
            </nav>
            <hr className='bg-light-blue' style={{height:'1px', border: 0}}/>
            <div className='w-100'>
                <div className='w-25 fl pa4'>
                <input type='file' onChange={(event) => fileSelectedHandler(event)} />
                {isLoading ?
                <div>
                    <div className="loader">Loading...</div>
                    <div className="tc"> Uploading...</div>
                </div>
                // <a className="mv2 f4 no-underline shadow-4 grow br-pill ph5 pv2 mb2 dib black bg-white pointer" href="#0">Uploading...</a>
                : 
                <div>
                <a onClick={() => fileUploadHandler()} className="mv2 f4 no-underline shadow-4 grow br-pill ph5 pv2 mb2 dib black bg-white pointer" href="#0">+ Upload</a>
                </div>
                }
                {/* <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    color="secondary" 
                    /> */}
                
                {this.state.isDownloading ? 
                <div>
                    <div class="sk-cube-grid">
                        <div class="sk-cube sk-cube1"></div>
                        <div class="sk-cube sk-cube2"></div>
                        <div class="sk-cube sk-cube3"></div>
                        <div class="sk-cube sk-cube4"></div>
                        <div class="sk-cube sk-cube5"></div>
                        <div class="sk-cube sk-cube6"></div>
                        <div class="sk-cube sk-cube7"></div>
                        <div class="sk-cube sk-cube8"></div>
                        <div class="sk-cube sk-cube9"></div>
                    </div>	
                    <div className="tc">Downloading... </div>
                </div>
                    :
                    <div></div>
                }
                </div>
                <div className='w-75 mv4 fl pa4 files'>

                        { 
                        filesOnServer.length ? 
                        <div> 
                            {
                            (filesOnServer).map(i => (
                                <article key={i.id} className="br2 ba dark-gray b--black-10 mv3 w-100 w-50-m w-25-l mw5 center dib shadow">
                                    <div className="pa2 ph3-ns pb3-ns bg-white center colorme">
                                    <div className="dt w-100 mt1">
                                    
                                        <h1 className="f5 mv0 w-50">{i.name}</h1>
                                        <small className="gray db pv2">Size: {i.size} kb</small>
                                        
                                    </div>
    
                                    <a 
                                        className="f6 grow no-underline br-pill ba ph3 pv2 mb2 dib mid-gray" 
                                        href="#0"
                                        onClick={() =>this.downloadFile(i.id)}>
                                        Download
                                    </a>
                                    
                                    <a 
                                        className="f6 bg-red white grow no-underline br-pill ba ph3 pv2 mb2 db mid-gray" 
                                        href="#0"
                                        onClick={() =>this.deleteFile(i.id)}>
                                        Delete
                                    </a>
                                    </div>
                                </article>
                            
                            ))} 
                        </div> 
                        :
                        <div> 
                            
                        </div> 
                        }
                </div>
            </div>
        </div>
        );
    }
}
export default Dashboard;