import uniqBy from 'lodash/uniqBy';
import { setArtistIds } from './artistActions';

export const fetchSongsPending = () => {
  return {
    type: 'FETCH_SONGS_PENDING'
  };
};

export const fetchSongsSuccess = (songs) => {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    songs
  };
};

export const fetchSongsError = () => {
  return {
    type: 'FETCH_SONGS_ERROR'
  };
};

export const fetchSongs = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/tracks?limit=50`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchSongsPending());




    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      // get all artist ids and remove duplicates
      let artistIds = uniqBy(res.items, (item) => {
        return item.track.artists[0].name;
      }).map(item => {
        return item.track.artists[0].id;
      }).join(',');

      dispatch(setArtistIds(artistIds));

      dispatch(fetchSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchSongsError(err));
    });



  };
};

export const fetchPlaylistSongsPending = () => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_PENDING'
  };
};

export const fetchPlaylistSongsSuccess = (songs, playlistId) => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_SUCCESS',
    songs: songs.map((el) => {
      el.playlists = [playlistId];
      return el;})

  };
};

export const fetchPlaylistSongsError = () => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_ERROR'
  };
};

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {

  return dispatch => {

    const request = new Request(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken.token
      })
    });

    dispatch(fetchPlaylistSongsPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {

      dispatch(fetchPlaylistSongsSuccess(res.items,playlistId));
    }).catch(err => {
      dispatch(fetchPlaylistSongsError(err));
    });
   };
};

export const removeSongsWithoutActivePlaylist =() => {
  return {
    type: 'REMOVE_SONGS_WITHOUT_ACTIVE_PLAYLIST'
  };
}
