import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const ANCHORAGE_DETAIL = 'ANCHORAGE_DETAIL';

const acceptActions =[ANCHORAGE_DETAIL];

const callBacks ={
  ANCHORAGE_DETAIL : (action)=>{ return { anchorage : action.response.anchorage } },
};

const initState = { isFetching:false, anchorage:{} };

export default function anchorageReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findAnchorageById(query) {
  return dispatchAction(ANCHORAGE_DETAIL,'findEPAnchorageById',query);
}
