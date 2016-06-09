/* global WINDOW document */
import './assets/styles/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// redux modules
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';

// application components
import App from './components/App';
import Menu from './components/Menu';
import Splash from './components/Splash';
import Classroom from './components/Classroom';
import Webcam from './components/Webcam';
import CreateAccount from './components/CreateAccount';
import SignIn from './containers/SignIn';
import SignOut from './containers/SignOut';
import Profile from './containers/Profile';
import Dashboard from './containers/Dashboard';
import StudyDeck from './containers/StudyDeck';
import Canvas from './components/Canvas';
import MessageApp from './containers/MessageApp';
import Room from './components/Room';
import { verifyAuthentication, fetchDecks } from './actions';

// services
import Auth from './services/AuthService';

// application configuration
import { DEBUG } from './config';

// import startChat from './chat';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

const isAuthorized = (nextState, replace, next) => {
  Auth.checkAuthorized()
    .then(check => {
      if (check.loggedIn) {
        next();
      } else {
        replace('/sign-in');
        next();
      }
    });
};

// startChat(store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Menu} onEnter={isAuthorized} />
        <Route path="/flash" component={Splash} onEnter={isAuthorized} />
        <Route path="/flash/dashboard" component={Dashboard} onEnter={isAuthorized} />
        <Route path="/flash/decks/:deckId/study" component={StudyDeck} onEnter={isAuthorized} />

        <Route path="/classroom" component={Classroom} onEnter={isAuthorized} />

        <Route path="/classroom/room/:id" component={Room} onEnter={isAuthorized} />

        <Route path="/message" component={MessageApp} onEnter={isAuthorized} />

        <Route path="/create-account" component={CreateAccount} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-out" component={SignOut} />
        <Route path="/profile" component={Profile} onEnter={isAuthorized} />

        <Route path="/canvas" component={Canvas} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

if (DEBUG) {
  store.subscribe(() => console.log(store.getState()));
}

store.dispatch(verifyAuthentication());
store.dispatch(fetchDecks());

// just for inspection
window.store = store;
