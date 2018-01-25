import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const REGULATION_ITEM = 'REGULATION_ITEM';

const acceptActions =[REGULATION_ITEM];

const callBacks ={
  REGULATION_ITEM : (action)=>{ return { regulationItem : action.response.regulationItem } },
};

const initState = { isFetching : false };

export default function regulationItemReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findRegulationById(query) {
  return dispatchAction(REGULATION_ITEM,'findEPRegulationById',query);
}
