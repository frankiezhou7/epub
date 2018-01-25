import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import { Provider } from 'react-redux';
import { match, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import injectTapEventPlugin from 'react-tap-event-plugin';
import preRenderMiddleware from  './middlewares/preRenderMiddleware';

import getRoutes from './routes';

import '../static/css/font.css';
import '../static/css/main.css';

const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  if (window.__data !== null) {
    window.__data = null;
    return;
  }
  const { components, params } = this.state;
  preRenderMiddleware(store.dispatch, components, params);
}

injectTapEventPlugin();

match({history, routes: getRoutes(store)}, (error, redirectLocation, renderProps) => {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <Router {...renderProps} onUpdate = {onUpdate}/>
    </Provider>,
    dest
  );
});

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./components/DevTools/DevTools');
  match({history, routes: getRoutes(store)}, (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <Provider store={store} key="provider">
        <div>
          <Router {...renderProps} onUpdate = {onUpdate}/>
          {/*<DevTools />*/}
        </div>
      </Provider>,
      dest
    );
  });
}
