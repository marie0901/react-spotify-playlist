import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import tokenReducer from '../reducers/token';
import userReducer from '../reducers/user';
import uiReducer from '../reducers/ui';
import playlistReducer from '../reducers/playlist';
import songsReducer from '../reducers/songs';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      token: tokenReducer,
      user: userReducer,
      ui: uiReducer,
      playlist: playlistReducer,
      songs: songsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
