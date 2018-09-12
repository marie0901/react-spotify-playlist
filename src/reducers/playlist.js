export const playlistReducer = (state = {playlists: [], displayedPlaylists: []}, action) => {
  switch (action.type) {

  case "FETCH_PLAYLIST_MENU_PENDING":
    return {
      fetchPlaylistPending: true,
      ...state
    };

  case "FETCH_PLAYLIST_MENU_SUCCESS":
    return {
      playlistMenu: action.playlists,
      playlists: action.playlists,
      fetchPlaylistError: false,
      fetchPlaylistPending: false,
      ...state
    };

  case "ADD_PLAYLIST_ITEM":
    return {
      ...state,
      playlists: [
        ...state.playlists,
        action.playlist
      ]
    };

    case "TOGGLE_PLAYLIST":

      let index = state.displayedPlaylists.findIndex( (el) => (el.id === action.playlist.id))

      if (index === -1) {
        return {
          ...state,
          displayedPlaylists: [
            ...state.displayedPlaylists,
            action.playlist
          ],
          playlistMenu:
            state.playlistMenu.map((el)=>{if(el.id === action.playlist.id) {el.Active = true;} return el;})
          
        };
      } else {
        return {
          ...state,
          displayedPlaylists: [
            ...state.displayedPlaylists.filter((el, idx) => idx !== index)
          ],
          playlistMenu:
            state.playlistMenu.map((el)=>{if(el.id === action.playlist.id) {el.Active = false;} return el;}),

        };
      }

  case "FETCH_PLAYLIST_MENU_ERROR":
    return {
      fetchPlaylistError: true,
      fetchPlaylistPending: false,
      ...state
    };

  default:
    return state;
  }
};

export default playlistReducer;
