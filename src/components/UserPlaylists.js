import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPlaylistsMenu,  togglePlaylist } from '../actions/playlistActions';
import { fetchPlaylistSongs, removeSongsWithoutActivePlaylist } from '../actions/songActions';
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
        if (!playlist.Active) {
          this.props.fetchPlaylistSongs(playlist.owner.id, playlist.id, this.props.token);
        } else {
          this.props.removeSongsWithoutActivePlaylist();
        }

        this.props.updateHeaderTitle(playlist.name);
        this.props.togglePlaylist(playlist);
      };

      return (

          <li key={ playlist.id }>
            <label htmlFor = { playlist.id } className = {playlist.Active ? 'btn text-dark nav-list-checkbox active' : 'btn text-dark nav-list-checkbox' }>
              { playlist.name }
            </label>
            <input id = { playlist.id } type='checkbox' className='nav-list-checkbox-input' onClick={ getPlaylistSongs } />

          </li>
      );
    });
  }  // end renderPlaylists



  render() {

    return (
      <div className='user-playlist-container'>
        <h3 className='navbar-fixed-top'>Playlists</h3>
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
  togglePlaylist: (playlist) => dispatch(togglePlaylist(playlist)),
  updateHeaderTitle: (title)  => dispatch(updateHeaderTitle(title)),
  removeSongsWithoutActivePlaylist: () => dispatch (removeSongsWithoutActivePlaylist())

});
export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
