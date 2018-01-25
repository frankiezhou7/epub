import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const SHIP_LIMIT_PORT = 'SHIP_LIMIT_PORT';
const SHIP_LIMIT_TERMINAL = 'SHIP_LIMIT_TERMINAL';

const acceptActions =[SHIP_LIMIT_PORT,SHIP_LIMIT_TERMINAL];

const callBacks ={
  SHIP_LIMIT_PORT : (action)=>{ return { datas : action.response.datas } },
  SHIP_LIMIT_TERMINAL : (action)=>{ return { datas : action.response.datas } },
};

const initState = { isFetching:false, datas:{} };

export default function shipLimitReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findPortShipLimitByCargoType(query) {
  return dispatchAction(SHIP_LIMIT_PORT,'findEPPortShipLimitByCargoType',query);
}
export function findTerminalShipLimitByCargoType(query) {
  return dispatchAction(SHIP_LIMIT_TERMINAL,'findEPTerminalShipLimitByCargoType',query);
}
