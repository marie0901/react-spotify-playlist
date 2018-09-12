import React, { Component } from 'react';
import moment from 'moment';

import { connect } from "react-redux";
import { fetchSongs } from '../actions/songActions';
import { fetchPlaylistSongs } from '../actions/playlistActions';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class SongList extends Component {

  componentWillReceiveProps (nextProps) {
    if(nextProps.token !== '' && !nextProps.fetchSongsError && nextProps.fetchSongsPending && nextProps.viewType === 'songs') {
    }
  }


//Render the songs as rows
  renderSongs() {
    return this.props.songs.map((song, i) => {
     const buttonClass = song.track.id === this.props.songId && !this.props.songPaused ? "fa-pause-circle-o" : "fa-play-circle-o";
     return (
       <TableRow key={i}>
         <TableCell component="th" scope="row">
           { song.track.name }
         </TableCell>
         <TableCell>{ song.track.artists[0].name }</TableCell>
         <TableCell>{ song.track.album.name }</TableCell>
         { this.renderPlaylistsForSong(song) }
       </TableRow>
     )})
   };

//Render column headers for each active playlist
  renderPlaylistsHeaders() {
    return this.props.displayedPlaylists.map((playlist)=>{
      return (<TableCell key= { playlist.id } > { playlist.name } </TableCell>)
    })
  };

  //Render cells in songs rows and check which playlists the songs belong to
    renderPlaylistsForSong(song) {
      return this.props.displayedPlaylists.map((playlist, i)=>{
        return (
          <TableCell key= { song.track.id + i } >
            { !!song.playlists.find((id)=>(id === playlist.id)) ? 'Y' : 'N' }
          </TableCell>)
      })
    };

//Render the whole table with songs
  render() {
    return (

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell >Artist</TableCell>
              <TableCell >Album</TableCell>
              { this.renderPlaylistsHeaders() }

            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.props.songs  && !this.props.fetchPlaylistSongsPending && this.renderSongs()
            }
          </TableBody>
        </Table>

    );
  }
}







const mapStateToProps = (state) => {

  return {
    token: state.token.token ? state.token.token : '',
    songs: state.songs.songs ? state.songs.songs : '',
    fetchSongsError: state.songs.fetchSongsError,
    fetchSongsPending: state.songs.fetchSongsPending,
    fetchPlaylistSongsPending: state.songs.fetchPlaylistSongsPending,
    songPlaying: state.songs.songPlaying,
    songPaused: state.songs.songPaused,
    songId: state.songs.songId,
    songAddedId: state.user.songId || '',
    viewType: state.songs.viewType,
    displayedPlaylists: state.playlist.displayedPlaylists
  };

};

const mapDispatchToProps = (dispatch) => {

  return {
    fetchSongs: ( accessToken) => dispatch(fetchSongs( accessToken)),
    fetchPlaylistSongs: ( userId, playlistId, accessToken) => dispatch(fetchPlaylistSongs(userId, playlistId, accessToken)),
    addSongToLibrary: ( accessToken) => dispatch(addSongToLibrary( accessToken)),
  }

};

export default  (connect(mapStateToProps, mapDispatchToProps)(SongList));
