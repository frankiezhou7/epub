import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const NEWS = 'NEWS';
const NEWS_PUSH = 'NEWS_PUSH';
const NEWS_BANNERS = 'NEWS_BANNERS';
const NEWS_TYPES = 'NEWS_TYPES';
const NEWS_RELATED = 'NEWS_RELATED';

const acceptActions =[NEWS_BANNERS, NEWS_TYPES, NEWS_RELATED, NEWS,NEWS_PUSH];

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
  NEWS_BANNERS : (action)=>{
    return {
      banners : action.response.banners,
    }
  },
  NEWS_TYPES : (action)=>{
    return {
      types : action.response.types,
    }
  },
  NEWS_RELATED : (action)=>{
    return {
      relatedNews : action.response.relatedNews,
    }
  },
};

const initState = {
  isFetching : false,
  news: [],
  banners: [],
  pagination:{},
  relatedNews: [],
  types:[]
};

export default function newsReducer(state = initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findNews(query) {
  return dispatchAction(NEWS,'findEPNews',query);
}

export function findNewsAndPush(query) {
  return dispatchAction(NEWS_PUSH,'findEPNews',query);
}

export function findNewsTypes(query) {
  return dispatchAction(NEWS_TYPES,'findEPNewsTypes',query);
}

export function findRelatedNews(query) {
  return dispatchAction(NEWS_RELATED,'findEPRelatedNews',query);
}

export function findNewsBanners(query) {
  return dispatchAction(NEWS_BANNERS,'findEPNewsBanners',query);
}
