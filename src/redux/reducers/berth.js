import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const BERTH_DETAIL = 'BERTH_DETAIL';

const acceptActions =[BERTH_DETAIL];

const callBacks ={
  BERTH_DETAIL : (action)=>{ return { berth : action.response.berth } },
};

const initState = { isFetching:false, berth:{} };

export default function berthReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findBerthById(query) {
  return dispatchAction(BERTH_DETAIL,'findEPBerthById',query);
}
