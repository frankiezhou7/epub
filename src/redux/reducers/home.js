import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const HOME_NEWS = 'HOME_NEWS';
const HOME_PORTS = 'HOME_PORTS';
const HOME_AGENCIES = 'HOME_AGENCIES';
const HOME_SUPPLIERS = 'HOME_SUPPLIERS';
const HOME_INSPECTIONS = 'HOME_INSPECTIONS';
const HOME_COUNTS = 'HOME_COUNTS';

const acceptActions =[HOME_NEWS,HOME_PORTS,HOME_AGENCIES,HOME_SUPPLIERS,HOME_INSPECTIONS,HOME_COUNTS];

const callBacks ={
  HOME_NEWS : (action)=>{ return { news : action.response.news } },
  HOME_PORTS : (action)=>{ return { ports : action.response.ports } },
  HOME_AGENCIES : (action)=>{ return { agencies : action.response.agencies } },
  HOME_SUPPLIERS : (action)=>{ return { suppliers : action.response.suppliers } },
  HOME_INSPECTIONS : (action)=>{ return { inspections : action.response.inspections } },
  HOME_COUNTS : (action)=>{ return { counts : action.response.counts } },
};

const initState = {
  isFetching:false,
  ports:[],
  agencies:[],
  suppliers:[],
  inspections:[],
  news: [],
  counts:{
    ports: 0,
    agencies: 0,
    suppliers: 0,
    inspections: 0,
    ships: 0
  },
}

export default function homeReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findHomeNews(query) {
  return dispatchAction(HOME_NEWS,'findEPHomeNews',query);
}

export function findHomePorts(query) {
  return dispatchAction(HOME_PORTS,'findEPHomePorts',query);
}

export function findHomeAgencies(query) {
  return dispatchAction(HOME_AGENCIES,'findEPHomeAgencies',query);
}

export function findHomeSuppliers(query) {
  return dispatchAction(HOME_SUPPLIERS,'findEPHomeSuppliers',query);
}

export function findHomeInspections(query) {
  return dispatchAction(HOME_INSPECTIONS,'findEPHomeInspections',query);
}

export function findHomeCounts(query) {
  return dispatchAction(HOME_COUNTS,'findEPHomeCounts',query);
}
