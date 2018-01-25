import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const NEWSITEM = 'NEWSITEM';

const acceptActions =[NEWSITEM];

const callBacks ={
  NEWSITEM : (action)=>{ return { newsItem : action.response.newsItem } },
};

const initState = { isFetching : false, newsItem : {} };

export default function newsItemReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findNewsById(query) {
  return dispatchAction(NEWSITEM,'findEPNewsById',query);
}
