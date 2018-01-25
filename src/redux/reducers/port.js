import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const PORT_DETAIL = 'PORT_DETAIL';

const acceptActions =[PORT_DETAIL];

const callBacks ={
  PORT_DETAIL : (action)=>{ return { port : action.response.port } },
};

const initState = { isFetching:false, port:{} };

export default function portReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findPortById(query) {
  return dispatchAction(PORT_DETAIL,'findEPPortById',query);
}
