import superagent from 'superagent';
import cache from '../cache';

const {
  SESSION_ID,
  DEVICE_ID,
} = cache;

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if(__SERVER__){
    return 'http://' + __EP_PUBLIC_SERVICE_HOST__ + ':' + __API_PORT__ + adjustedPath;
  }
  return window.__API_URI + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { data , params } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        let did = cache.get(DEVICE_ID);
        let sid = cache.get(SESSION_ID);

        if(did) {
          request.set('x-device-id', did);
        }
        if(sid) {
          request.set('x-session-id', sid);
        }

        if (params) {
          request.query(params);
        }
        if (__SERVER__ && req && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }
        if (data) {
          if(__SERVER__) {
            request.send(data);
          }else {
            let files = {};
            for(let key in data) {
              if(Object.prototype.toString.call(data[key]) === '[object File]') {
                files[key] = data[key];
                delete data[key];
              }
            }
            if(files.length <1) {
              request.send(data);
            }else {
              for(let filename in files) {
                request.attach(filename, files[filename], files[filename].name);

              }
              let strRequest = null;
              try {
                strRequest = JSON.stringify(data);
              } catch(e) { return done(e); }

              request.field('request', strRequest);
            }
          }
        }
        request.end((err, response) => {
          if(!err){
            let headers =response.headers;
            let sid = headers && headers['x-session-id'];
            let did = headers && headers['x-device-id'];

            if(sid === 'null' || sid === '') {
              cache.remove(SESSION_ID);
            } else if(sid) {
              cache.set(SESSION_ID, sid);
            }

            if(did) {
              cache.set(DEVICE_ID, did);
            }
          }else{
            let errorCode = response.body && response.body.errorCode;
            if(errorCode && errorCode ==='SESSION_EXPIRED') {
              cache.remove(SESSION_ID);
            }
          }
          return err ? reject(err) : resolve(response.body);
        });
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
