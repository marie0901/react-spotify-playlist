import uniqBy from 'lodash/uniqBy';

export const fetchPlaylistMenuPending = () => {
  return {
    type: 'FETCH_PLAYLIST_MENU_PENDING'
  };
};

export const fetchPlaylistMenuSuccess = (playlists) => {

  return {
    type: 'FETCH_PLAYLIST_MENU_SUCCESS',
    playlists: playlists.map((el) => {
      el.Active = false;
      return el;})
  };
};

export const fetchPlaylistMenuError = () => {
  return {
    type: 'FETCH_PLAYLIST_MENU_ERROR'
  };
};

export const addPlaylistItem = (playlist) => {
  return {
    type: 'ADD_PLAYLIST_ITEM',
    playlist
  };
};

export const togglePlaylist = (playlist) => {
  return {
    type: 'TOGGLE_PLAYLIST',
    playlist
  };
};

export const fetchPlaylistsMenu = (userId, accessToken) => {
  return (dispatch )=> {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken.token
      })
    });

    dispatch(fetchPlaylistMenuPending());

    fetch(request).then(res => {

      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      dispatch(fetchPlaylistMenuSuccess(res.items));

    }).catch(err => {
      dispatch(fetchPlaylistMenuError(err));

    });
  };
};
