import warning from 'warning';

const prefix = 'FIND';
const fail = 'FAIL';
const success = 'SUCCESS';
const separator = '_';

const creatAction = (action,pre,post)=>{
  if(pre) action= pre+separator+action;
  if(post) action+= separator+post;
  return action;
};

const generateActionTypes = (action)=>{
  return [creatAction(action,prefix),creatAction(action,prefix,success),creatAction(action,prefix,fail)];
};

export function dispatchAction(action,apiPath,query,method){
  method = method || 'post';
  const q = method === 'get' ? {params:query} : {data:query};
  return {
    types: generateActionTypes(action),
    promise: (client) => client[method]('/'+apiPath,q)
  };
}

export function registeActions(state,action,acceptActions,callBacks){
  for(let ac of acceptActions){
    for(let gac of generateActionTypes(ac)){
      if(action.type === gac){
        if(action.type.indexOf(fail)>0){
          return {
            ...state,
            isFetching: false,
            error: action.error
          };
        }else if(action.type.indexOf(success)>0){
          warning(callBacks[ac]!==undefined,`you should implement call back function for action ${ac}`);
          return Object.assign({
            ...state,
            isFetching: false,
          },callBacks[ac](action,state));
        }else{
          return {
            ...state,
            isFetching: true
          };
        }
      }
    }
  }
  return state;
}
