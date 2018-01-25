import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const REGULATION = 'REGULATION';
const REGULATION_PUSH = 'REGULATION_PUSH';

const acceptActions =[REGULATION,REGULATION_PUSH];

const callBacks ={
  REGULATION : (action)=>{
    return {
      regulations : action.response.regulations,
      pagination : action.response.pagination
    }
  },
  REGULATION_PUSH : (action,state)=>{
    return {
      regulations : state.regulations.concat(action.response.regulations),
      pagination : action.response.pagination,
    }
  },
};

const initState = {
  isFetching : false,
  regulations: [],
  pagination:{}
};

export default function regulationsReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findRegulations(query) {
  return dispatchAction(REGULATION,'findEPRegulations',query);
}

export function findRegulationsAndPush(query) {
  return dispatchAction(REGULATION_PUSH,'findEPRegulations',query);
}
