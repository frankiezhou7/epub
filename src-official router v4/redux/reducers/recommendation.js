import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const RECOMMENDATION_NEWS = 'RECOMMENDATION_NEWS';
const RECOMMENDATION_REGULATIONS = 'RECOMMENDATION_REGULATIONS';
const RECOMMENDATION_MAINLY_PORTS = 'RECOMMENDATION_MAINLY_PORTS';
const RECOMMENDATION_SERVICE_PROVIDERS = 'RECOMMENDATION_SERVICE_PROVIDERS';
const RECOMMENDATION_BRANCH = 'RECOMMENDATION_BRANCH';

const acceptActions =[RECOMMENDATION_NEWS, RECOMMENDATION_REGULATIONS, RECOMMENDATION_MAINLY_PORTS,RECOMMENDATION_SERVICE_PROVIDERS,RECOMMENDATION_BRANCH];

const callBacks ={
  RECOMMENDATION_NEWS : (action)=>{ return { news : action.response.news } },
  RECOMMENDATION_REGULATIONS : (action)=>{ return { regulations : action.response.regulations } },
  RECOMMENDATION_MAINLY_PORTS : (action)=>{ return { mainlyPorts : action.response.mainlyPorts } },
  RECOMMENDATION_SERVICE_PROVIDERS : (action)=>{ return { serviceProviders : action.response.serviceProviders } },
  RECOMMENDATION_BRANCH : (action)=>{ return { branch : action.response.branch } },
};

const initState = {
  isFetching: false,
  news: [],
  regulations: [],
  mainlyPorts:[],
  branch:[],
  serviceProviders:{
    agencies:[],
    suppliers:[],
  },
}

export default function recommendationReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findRecommendableNews(query) {
  return dispatchAction(RECOMMENDATION_NEWS,'findEPRecommendableNews',query);
}

export function findRecommendableRegulations(query) {
  return dispatchAction(RECOMMENDATION_REGULATIONS,'findEPRecommendableRegulations',query);
}

export function findRecommendableMainlyPorts(query) {
  return dispatchAction(RECOMMENDATION_MAINLY_PORTS,'findEPRecommendableMainlyPorts',query);
}

export function findRecommendableServiceProviders(query) {
  return dispatchAction(RECOMMENDATION_SERVICE_PROVIDERS,'findEPRecommendableServiceProviders',query);
}

export function findRecommendableBranch(query) {
  return dispatchAction(RECOMMENDATION_BRANCH,'findEPRecommendableBranch',query);
}
