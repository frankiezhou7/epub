import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const TERMINAL_DETAIL = 'TERMINAL_DETAIL';

const acceptActions =[TERMINAL_DETAIL];

const callBacks ={
  TERMINAL_DETAIL : (action)=>{ return { terminal : action.response.terminal } },
};

const initState = { isFetching:false, terminal:{} };

export default function terminalReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findTerminalById(query) {
  return dispatchAction(TERMINAL_DETAIL,'findEPTerminalById',query);
}
