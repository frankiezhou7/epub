import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const PORT_DETAIL = 'PORT_DETAIL';
const PORT_INDEX = 'PORT_INDEX';
const PORTS_QUERY = 'PORTS_QUERY';
const RECOMMENDATION_PORTS = 'RECOMMENDATION_PORTS';

const acceptActions =[PORTS_QUERY,PORT_DETAIL, PORT_INDEX, RECOMMENDATION_PORTS];

const callBacks = {
  PORT_DETAIL : (action)=>{ return { port : action.response.port } },
  PORT_INDEX : (action)=>{ return { portIndex : action.response.portIndex } },
  PORTS_QUERY: (action)=>{ return { ports : action.response.ports } },
  RECOMMENDATION_PORTS: (action)=>{ return { ports : action.response.ports } },
};

const initState = { isFetching:false, port:{}, portIndex: {}, ports: [] };

export default function portReducer(state = initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findPortById(query) {
  return dispatchAction(PORT_DETAIL,'findEPPortById',query);
}

export function findPortIndex(query) {
  return dispatchAction(PORT_INDEX,'findEPPortIndex',query);
}

export function findPortsByQuery(query) {
  return dispatchAction(PORTS_QUERY,'findEPPortsByQuery',query);
}

export function findRecommendablePorts(query) {
  return dispatchAction(RECOMMENDATION_PORTS,'findEPRecommendablePorts',query);
}
