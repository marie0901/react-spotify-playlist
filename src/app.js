import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';


import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import DashboardPage from './components/DashboardPage';

import './styles/sidenav.css';
import './styles/dashboard.css';
import './styles/shell.css';

// import 'normalize.css/normalize.css';
// import './styles/styles.scss';
// import './styles/styles.css';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    {/* <AppRouter /> */}
    <DashboardPage />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

renderApp();

// ReactDOM.render(<LoadingPage />, document.getElementById('app'));
//
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     renderApp();
//     if (history.location.pathname === '/') {
//       history.push('/dashboard');
//     }
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
