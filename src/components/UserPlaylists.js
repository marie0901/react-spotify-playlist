

//////////////////////////////////////////////////////           Component.js ????????????????????????????????????
import React, { Component } from 'react';
// import './UserPlaylists.css';
import { connect } from "react-redux";
import { fetchPlaylistsMenu, fetchPlaylistSongs, displayPlaylist } from '../actions/playlistActions';
import { updateHeaderTitle } from '../actions/uiActions';

class UserPlaylists extends Component {

  componentWillReceiveProps (nextProps) {
    if(nextProps.userId !== '' && nextProps.token !== '') {
      this.props.fetchPlaylistsMenu(nextProps.userId, nextProps.token);
    }
  }

  renderPlaylists() {

    return this.props.playlistMenu.map(playlist => {
      const getPlaylistSongs = () => {
        console.log('111111111');
        this.props.fetchPlaylistSongs(playlist.owner.id, playlist.id, this.props.token);
        this.props.updateHeaderTitle(playlist.name);
        this.props.displayPlaylist(playlist);

      };

      return (

          <li key={ playlist.id }>
            <input id = { playlist.id } type='checkbox' onClick={ getPlaylistSongs } />
            <label htmlFor = { playlist.id } className='btn text-dark nav-list-checkbox active'>
              { playlist.name }
            </label>
          </li>
      );
    });
  }  // end renderPlaylists



  render() {

    return (
      <div className='user-playlist-container'>
        <h3 className='user-playlist-header'>Playlists</h3>
        {
          this.props.playlistMenu && this.renderPlaylists()
        }
      </div>
    );

  }
}

const mapStateToProps = (state) => {
      return {
        token:  state.token ? state.token : '',
        userId: state.user.user ? state.user.user.id : '',
        playlistMenu: state.playlist.playlistMenu ? state.playlist.playlistMenu : '',
        title: state.title ? state.title : ''

      };
};



const mapDispatchToProps = (dispatch, props) => ({
  fetchPlaylistsMenu: (userId, accessToken) => dispatch(fetchPlaylistsMenu(userId, accessToken)),
  fetchPlaylistSongs: (userId, playlistId, accessToken) => dispatch(fetchPlaylistSongs(userId, playlistId, accessToken)),
  displayPlaylist: (playlist) => dispatch(displayPlaylist(playlist)),
  updateHeaderTitle: (title)  => dispatch(updateHeaderTitle(title))

});
export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
