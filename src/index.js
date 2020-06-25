import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/AppContainer';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const middlewares = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
      {/* <Router>
        <Route path="/" component={GameIndexContainer} />
        <Route path="/show/:id" component={GameShowComponent} />
      </Router> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
