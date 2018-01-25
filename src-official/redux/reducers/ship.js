import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const SHIP_DETAIL = 'SHIP_DETAIL';

const acceptActions =[SHIP_DETAIL];

const callBacks ={
  SHIP_DETAIL : (action)=>{ return { ship : action.response.ship } },
};

const initState = { isFetching:false, ship:{} };

export default function shipReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findShipById(query) {
  return dispatchAction(SHIP_DETAIL,'findEPShipById',query);
}
