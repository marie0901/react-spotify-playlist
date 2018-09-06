import React, { Component } from 'react';
import moment from 'moment';
//import './SongList.css';

import { connect } from "react-redux";
import { fetchSongs } from '../actions/songActions';
import { addSongToLibrary } from '../actions/userActions';


import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class SongList extends Component {

  componentWillReceiveProps (nextProps) {
    if(nextProps.token !== '' && !nextProps.fetchSongsError && nextProps.fetchSongsPending && nextProps.viewType === 'songs') {
      this.props.fetchSongs(nextProps.token);
    }
  }

  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }




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
         <TableCell>Playlist[j].hasSong(song.track.name )</TableCell>
         <TableCell>{ this.msToMinutesAndSeconds(song.track.duration_ms) }</TableCell>
       </TableRow>
     )})
     }


  render() {

    return (

        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell >Artist</TableCell>
              <TableCell >Album</TableCell>
              <TableCell > </TableCell>
              <TableCell > </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.props.songs && !this.props.fetchSongsPending && !this.props.fetchPlaylistSongsPending && this.renderSongs()
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
  };

};

const mapDispatchToProps = (dispatch) => {

  return {
    fetchSongs: ( accessToken) => dispatch(fetchSongs( accessToken)),
    addSongToLibrary: ( accessToken) => dispatch(addSongToLibrary( accessToken)),
  }

};

export default  (connect(mapStateToProps, mapDispatchToProps)(SongList));
