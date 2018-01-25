import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const SEARCH = 'SEARCH';
const SEARCH_PUSH = 'SEARCH_PUSH';

const acceptActions =[SEARCH,SEARCH_PUSH];

const callBacks ={
  SEARCH : (action)=>{
    return {
      results : action.response.results,
      pagination : action.response.pagination,
    }
  },
  SEARCH_PUSH : (action,state)=>{
    return {
      results : state.results.concat(action.response.results),
      pagination : action.response.pagination,
    }
  },
};

const initState = { isFetching:false, results:[] };

export default function searchReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function search(query) {
  return dispatchAction(SEARCH,'search',query);
}

export function searchAndPush(query) {
  return dispatchAction(SEARCH_PUSH,'search',query);
}
