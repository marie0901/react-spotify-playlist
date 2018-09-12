import uniq from 'lodash/uniqBy';

const defaultState = {
  fetchSongsPending: true,
  songPlaying: false,
  timeElapsed: 0,
  songId: 0,
  viewType:'songs',
  songPaused: true,
  songs: []
};

export const songsReducer = (state = defaultState, action) => {

  switch (action.type) {


  case "FETCH_SONGS_PENDING":
    return {
      ...state,
      fetchSongsPending: true
    };

  case "FETCH_SONGS_SUCCESS":
    return {
      ...state,
      songs: action.songs,
      fetchSongsError: false,
      fetchSongsPending: false,
      viewType: 'songs'
    };

  case "FETCH_SONGS_ERROR":
    return {
      ...state,
      fetchSongsError: true,
      fetchSongsPending: false
    };

  case "FETCH_PLAYLIST_SONGS_PENDING":
    return {
      ...state,
      fetchPlaylistSongsPending: true
    };


  case "REMOVE_SONGS_WITHOUT_ACTIVE_PLAYLIST":
//  console.log("REMOVE_SONGS_WITHOUT_ACTIVE_PLAYLIST", state.songs.songs[0].playlists.reduce((result,playlist)=>result && playlist.Active) );
  console.log("REMOVE_SONGS_WITHOUT_ACTIVE_PLAYLIST", !!state.songs[0].playlists.reduce((result,playlist)=>result && playlist.Active) )
    return {
      ...state,
      songs: state.songs.filter((song)=> !song.playlists.reduce((result,playlist)=>result && playlist.Active) )
    };



  case "FETCH_PLAYLIST_SONGS_SUCCESS":

    let  songs = [
          ...state.songs,
          ...action.songs
        ];

//Here is an example of getting unique list without lodash
let map = new Map;
let    result = [];
    songs.forEach(function (a) {
      let o = map.get(a.track.id);
      if (!o) {
          o = { trackId: a.track.id };
          map.set(a.track.id, a.playlists);
          result.push(a);
      } else {
          let song_playlists = result.find((song)=>(song.track.id === a.track.id)).playlists.concat(a.playlists);
          result.find((song)=>(song.track.id === a.track.id)).playlists = uniq(song_playlists);
        }
    });

    songs = result;
    return {
      ...state,
      songs: songs,

      viewType: 'playlist',
      fetchPlaylistSongsError: false,
      fetchPlaylistSongsPending: false
    };



  case "FETCH_PLAYLIST_SONGS_ERROR":
    return {
      ...state,
      fetchPlaylistSongsError: true,
      fetchPlaylistSongsPending: false
    };

  case "FETCH_ARTIST_SONGS_PENDING":
    return {
      ...state,
      fetchArtistSongsPending: true
    };

  case "FETCH_ARTIST_SONGS_SUCCESS":
    return {
      ...state,
      songs: action.songs,
      viewType: 'Artist',
      fetchArtistSongsError: false,
      fetchArtistSongsPending: false
    };

  case "FETCH_ARTIST_SONGS_ERROR":
    return {
      ...state,
      fetchArtistSongsError: true,
      fetchArtistSongsPending: false
    };

  case "PLAY_SONG":
    return {
      ...state,
      songPlaying: true,
      songDetails: action.song,
      songId: action.song.id,
      timeElapsed: 0,
      songPaused: false
    };

  case "STOP_SONG":
    return {
      ...state,
      songPlaying: false,
      songDetails: null,
      timeElapsed: 0,
      songPaused: true
    };

  case "PAUSE_SONG":
    return {
      ...state,
      songPaused: true
    };

  case "RESUME_SONG":
    return {
      ...state,
      songPaused: false
    };

  case "INCREASE_SONG_TIME":
    return {
      ...state,
      timeElapsed: action.time
    };

  default:
    return state;
  }

};

export default songsReducer;
