export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          const response = result.response;
          if(result.status ==='OK'){
            next({...rest, response, type: SUCCESS})
          }else{
            next({...rest, response, type: FAILURE})
          }
        },
        (error) => {
          throw error;
          next({...rest, error, type: FAILURE})
        }
      ).catch((error)=> {
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}
