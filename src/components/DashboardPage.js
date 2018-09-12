import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken } from '../actions/tokenActions';
import { fetchUser } from '../actions/userActions';
import UserPlaylists from './UserPlaylists';
import SongList from './SongList';


class DashboardPage extends Component {

  componentDidMount() {

    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if(!hashParams.access_token) {
      const href = 'https://accounts.spotify.com/authorize?client_id=' +
      '2216c67186aa4f4a8a20650cf50af9c9' +
      '&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state'+
      '&response_type=token&redirect_uri=http://localhost:8080/callback';
      window.location.href = href;
    } else {

       this.props.setToken(hashParams.access_token);
      }

  }

  	componentWillReceiveProps(nextProps) {
  	  if(nextProps.token) {
  	    this.props.fetchUser(nextProps.token);
      };

  	}

  render() {
    return (

      <div >
        <nav className = 'navbar navbar-fixed-top header'>
          <h1>Manage your Spotify playlists</h1>
            <a href="https://github.com/marie0901/react-spotify-playlist" className="github-corner" aria-label="View source on Github">
              <svg width='80' height='80' viewBox='0 0 250 250' style={{ position:"absolute",
                top: 0, borderWidth: 0, borderColor: "black", borderStyle: "solid", right:
                0 }} fill='white' color='black'>
                <path d='M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z' />
                <path d='M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2'
                fill='currentColor' style={{ transformOrigin: '130px106px' }} className='octo-arm'/>
                <path d='M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9      152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z'
                fill='currentColor' className='octo-body' />
              </svg>
            </a>
          </nav>

        <div className = 'container-fluid'>
          <div className = 'row'>
            <div className = 'col-sm-4 col-md-3 col-lg-2 nav-sidebar'>
              <UserPlaylists />
            </div>
            <div className = 'col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 col-lg-10 col-lg-offset-2 main-content'>
              <SongList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


  const mapStateToProps = (state) => {
    return {
      token:  state.token,
    };

  };

  const mapDispatchToProps = (dispatch, props) => ({
    setToken: (token) => dispatch(setToken(token)),
    fetchUser: (accessToken) => dispatch(fetchUser(accessToken))

  });

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
