import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import { Provider } from 'react-redux';
import { Router, Route, matchPath ,Switch } from 'react-router-dom';
import createBrowser from "history/createBrowserHistory"
//import useScroll from 'use-scroll-behavior';
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import _ from 'eplodash';
import injectTapEventPlugin from 'react-tap-event-plugin';
import preRenderMiddleware from  './middlewares/preRenderMiddleware';

import routes from './routes';

import '../static/css/font.css';
import '../static/css/main.css';

const client = new ApiClient();
const browserHistory=createBrowser();
const history = qhistory(browserHistory,stringify,parse);
const dest = document.getElementById('content');
const store = createStore(history, client, window.__data);


browserHistory.listen((location,action)=>{
  //console.log(location.pathname,'action:',action)
  routes.some(route => {
    const match = matchPath(location.pathname, route);

    if (match) {
      let preLoadArr=_.isArray(route.preLoad)?route.preLoad:[route.preLoad];
      preRenderMiddleware(store.dispatch, preLoadArr, match.params)
      .then((data)=>{

      })
    }
  });
});

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

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {
          routes.map((route,index)=>(
            <Route key={index} {...route}/>
          ))
        }
      </Switch>
    </Router>
  </Provider>,
  dest
);

// match({history, routes: getRoutes(store)}, (error, redirectLocation, renderProps) => {
//   ReactDOM.render(
//     <Provider store={store} key="provider">
//       <Router {...renderProps} onUpdate = {onUpdate}/>
//     </Provider>,
//     dest
//   );
// });

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./components/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {
            routes.map((route,index)=>(
              <Route key={index} {...route}/>
            ))
          }
        </Switch>
      </Router>
    </Provider>,
    dest
  );
  // match({history, routes: getRoutes(store)}, (error, redirectLocation, renderProps) => {
  //   ReactDOM.render(
  //     <Provider store={store} key="provider">
  //       <div>
  //         <Router {...renderProps} onUpdate = {onUpdate}/>
  //         {/*<DevTools />*/}
  //       </div>
  //     </Provider>,
  //     dest
  //   );
  // });
}
