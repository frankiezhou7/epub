import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import preRenderMiddleware from './middlewares/preRenderMiddleware';
import { StaticRouter , Router ,matchPath ,Switch ,Route} from 'react-router';
//import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import ErrorPage from './pages/errors/500';
import NotFoundPage from './pages/errors/404';
import {Provider} from 'react-redux';
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'
import _ from 'eplodash';
import routes from './routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = qhistory(createHistory(),stringify,parse);
  const store = createStore(memoryHistory, client);
  //const history = syncHistoryWithStore(memoryHistory, store);


  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  function renderErrorPage(err){
    global.navigator = {userAgent: req.headers['user-agent']};
    let component = ErrorPage;
    if(err.status === 404){
      component = NotFoundPage
    }
    res.status(err.status||500).send(
      '<!doctype html>\n' +
      ReactDOM.renderToString(
        <Html
          assets={webpackIsomorphicTools.assets()}
          component={React.createElement(component)}
          store={store}
          enableScript = {false}
        />
      )
    );
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  let context={};

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();

    return
  }

  routes.some(route => {
    const match = matchPath(req.url, route);

    if (match){
      memoryHistory.location={
        ... memoryHistory.location,
        search:_.isEmpty(req.query)?'':'?'+stringify(req.query),
        pathname:req.path,
        query:req.query
      };
      //console.log('match',match,'\n')
      console.log('location',memoryHistory.location,'\n')
      //console.log(route,'\n')

      let preLoadArr=_.isArray(route.preLoad)?route.preLoad:[route.preLoad];
      preRenderMiddleware(
        store.dispatch,
        preLoadArr,
        match.params
      )
      .then((data) => {
        //console.log('data','\n',data)
        const component =(
          <Provider store={store}>
              <Router context={context} history={memoryHistory}>
              <Switch>
                {
                 routes.map((route,index)=>(
                   <Route key={index} {...route}/>
                 ))
                }
              </Switch>
              </Router>
          </Provider>
        );
        global.navigator = {userAgent: req.headers['user-agent']};
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      })
      .catch(err =>{
        console.error(err);
        renderErrorPage(err);
      })
    }

    return match
  })




  /*match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      // This method waits for all render component
      // promises to resolve before returning to browser
      preRenderMiddleware(
        store.dispatch,
        renderProps.components,
        renderProps.params
      )
      .then(() => {
        const component =(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        global.navigator = {userAgent: req.headers['user-agent']};
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      })
      .catch(err =>{
        console.error(err);
        renderErrorPage(err);
      });
    } else {
      renderErrorPage({status: 404});
    }
  });*/
});

if (__PORT__) {
  server.listen(__PORT__, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', __HOST__, __PORT__);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
