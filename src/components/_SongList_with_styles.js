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

  // <div onClick={() => {(song.track.id === this.props.songId) && this.props.songPlaying && this.props.songPaused ? this.props.resumeSong() :
  //   this.props.songPlaying && !this.props.songPaused && (song.track.id === this.props.songId)  ? this.props.pauseSong() :
  //     this.props.audioControl(song); } } className='play-song'>
  //   <i className={`fa ${buttonClass} play-btn`} aria-hidden="true"/>
  // </div>


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
         <TableCell>{ moment(song.added_at).format('YYYY-MM-DD') }</TableCell>
         <TableCell>{ this.msToMinutesAndSeconds(song.track.duration_ms) }</TableCell>
       </TableRow>
     )})
     }


  render() {

    return (

      <Paper className={this.props.classes.root} >
        <Table className={this.props.classes.table}>
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
        </Paper>
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

export default withStyles(styles) (connect(mapStateToProps, mapDispatchToProps)(SongList));




//
// /////////////////////// component.js//////////////////////////////////////////////////
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import './SongList.css';
//
// class SongList extends Component {
//
//   componentWillReceiveProps (nextProps) {
//     if(nextProps.token !== '' && !nextProps.fetchSongsError && nextProps.fetchSongsPending && nextProps.viewType === 'songs') {
//       this.props.fetchSongs(nextProps.token);
//     }
//   }
//
//   msToMinutesAndSeconds(ms) {
//     const minutes = Math.floor(ms / 60000);
//     const seconds = ((ms % 60000) / 1000).toFixed(0);
//     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
//   }
//
//   renderSongs() {
//     return this.props.songs.map((song, i) => {
//       const buttonClass = song.track.id === this.props.songId && !this.props.songPaused ? "fa-pause-circle-o" : "fa-play-circle-o";
//
//       return (
//         <li className={song.track.id === this.props.songId ? 'active user-song-item' : 'user-song-item'} key={ i }>
//           <div onClick={() => {(song.track.id === this.props.songId) && this.props.songPlaying && this.props.songPaused ? this.props.resumeSong() :
//             this.props.songPlaying && !this.props.songPaused && (song.track.id === this.props.songId)  ? this.props.pauseSong() :
//               this.props.audioControl(song); } } className='play-song'>
//             <i className={`fa ${buttonClass} play-btn`} aria-hidden="true"/>
//           </div>
//
//           {this.props.viewType !== 'songs' && (
//             <p className='add-song' onClick={() => {this.props.addSongToLibrary(this.props.token, song.track.id);}}>
//               {this.props.songAddedId === song.track.id ?
//                 (<i className="fa fa-check add-song" aria-hidden="true" />) :
//                 (<i className="fa fa-plus add-song" aria-hidden="true" />)
//               }
//             </p>
//           )}
//
//           {this.props.viewType == 'songs' && (
//             <p className='add-song'>
//               <i className="fa fa-check" aria-hidden="true"/>
//             </p>
//           )}
//
//           <div className='song-title'>
//             <p>{ song.track.name }</p>
//           </div>
//
//           <div className='song-artist'>
//             <p>{ song.track.artists[0].name }</p>
//           </div>
//
//           <div className='song-album'>
//             <p>{ song.track.album.name }</p>
//           </div>
//
//           <div className='song-added'>
//             <p>{ moment(song.added_at).format('YYYY-MM-DD')}</p>
//           </div>
//
//           <div className='song-length'>
//             <p>{ this.msToMinutesAndSeconds(song.track.duration_ms) }</p>
//           </div>
//         </li>
//       );
//     });
//   }
//
//   render() {
//
//     return (
//       <div>
//         <div className='song-header-container'>
//           <div className='song-title-header'>
//             <p>Title</p>
//           </div>
//           <div className='song-artist-header'>
//             <p>Artist</p>
//           </div>
//           <div className='song-album-header'>
//             <p>Album</p>
//           </div>
//           <div className='song-added-header'>
//             <i className="fa fa-calendar-plus-o" aria-hidden="true"/>
//           </div>
//           <div className='song-length-header'>
//             <p><i className="fa fa-clock-o" aria-hidden="true" /></p>
//           </div>
//         </div>
//         {
//           this.props.songs && !this.props.fetchSongsPending && !this.props.fetchPlaylistSongsPending && this.renderSongs()
//         }
//
//       </div>
//     );
//   }
// }
//
// SongList.propTypes = {
//   viewType: PropTypes.string,
//   token: PropTypes.string,
//   songAddedId: PropTypes.string,
//   songId: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]),
//   songs: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.array
//   ]),
//   fetchSongsError: PropTypes.bool,
//   fetchSongsPending: PropTypes.bool,
//   fetchPlaylistSongsPending: PropTypes.bool,
//   fetchSongs: PropTypes.func,
//   audioControl: PropTypes.func,
//   songPaused: PropTypes.bool,
//   songPlaying: PropTypes.bool,
//   resumeSong: PropTypes.func,
//   pauseSong: PropTypes.func,
//   addSongToLibrary: PropTypes.func,
// };
//
// export default SongList;
