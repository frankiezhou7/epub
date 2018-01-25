import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const NEWS = 'NEWS';
const NEWS_PUSH = 'NEWS_PUSH';

const acceptActions =[NEWS,NEWS_PUSH];

const callBacks ={
  NEWS : (action)=>{
    return {
      news : action.response.news,
      pagination : action.response.pagination
    }
  },
  NEWS_PUSH : (action,state)=>{
    return {
      news : state.news.concat(action.response.news),
      pagination : action.response.pagination,
    }
  },
};

const initState = {
  isFetching : false,
  news: [],
  pagination:{}
};

export default function newsReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findNews(query) {
  return dispatchAction(NEWS,'findEPNews',query);
}

export function findNewsAndPush(query) {
  return dispatchAction(NEWS_PUSH,'findEPNews',query);
}
