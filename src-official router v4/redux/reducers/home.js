import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const HOME_NEWS = 'HOME_NEWS';
const HOME_REGULATIONS = 'HOME_REGULATIONS';
const HOME_PORTS = 'HOME_PORTS';
const HOME_AGENCIES = 'HOME_AGENCIES';
const HOME_SUPPLIERS = 'HOME_SUPPLIERS';
const HOME_INSPECTIONS = 'HOME_INSPECTIONS';
const HOME_SPROS = 'HOME_SPROS';
const HOME_WORKSHOPS = 'HOME_WORKSHOPS';
const HOME_SHIPYARDS = 'HOME_SHIPYARDS';
const HOME_OTHERS = 'HOME_OTHERS';
const HOME_COUNTS = 'HOME_COUNTS';
const HOME_BANNERS = 'HOME_BANNERS';
const HOME_PARTNERSHIP = 'HOME_PARTNERSHIP';
const HOME_PARTNERSHIP_VISIBILITY = 'HOME_PARTNERSHIP_VISIBILITY';


const acceptActions =[HOME_SPROS, HOME_WORKSHOPS, HOME_PARTNERSHIP_VISIBILITY, HOME_BANNERS,HOME_PARTNERSHIP,HOME_NEWS,HOME_REGULATIONS, HOME_PORTS,HOME_AGENCIES,HOME_SUPPLIERS,HOME_INSPECTIONS,HOME_SHIPYARDS,HOME_OTHERS,HOME_COUNTS];

const callBacks ={
  HOME_NEWS : (action)=>{ return { news : action.response.news } },
  HOME_REGULATIONS : (action)=>{ return { regulations : action.response.regulations } },
  HOME_PORTS : (action)=>{ return { ports : action.response.ports } },
  HOME_AGENCIES : (action)=>{ return { agencies : action.response.agencies } },
  HOME_SUPPLIERS : (action)=>{ return { suppliers : action.response.suppliers } },
  HOME_INSPECTIONS : (action)=>{ return { inspections : action.response.inspections } },
  HOME_SHIPYARDS : (action)=>{ return { shipyards : action.response.shipyards } },
  HOME_SPROS : (action)=>{ return { spros : action.response.spros } },
  HOME_WORKSHOPS : (action)=>{ return { workshops : action.response.workshops } },
  HOME_OTHERS : (action)=>{ return { others : action.response.others } },
  HOME_COUNTS : (action)=>{ return { counts : action.response.counts } },
  HOME_BANNERS: (action)=>{ return { banners : action.response.banners } },
  HOME_PARTNERSHIP: (action)=>{ return { partnership : action.response.partnership } },
  HOME_PARTNERSHIP_VISIBILITY: (action)=>{ return { visibility : action.response.visibility } },
};

const initState = {
  isFetching:false,
  ports:[],
  agencies:[],
  suppliers:[],
  inspections:[],
  shipyards:[],
  others:[],
  news: [],
  counts:{
    ports: 0,
    agencies: 0,
    suppliers: 0,
    inspections: 0,
    ships: 0
  },
  spros: [],
  workshops: [],
  banners: [],
  partnership: [],
  visibility: false,
}

export default function homeReducer(state = initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findHomeNews(query) {
  return dispatchAction(HOME_NEWS,'findEPHomeNews',query);
}

export function findHomeBanners(query) {
  return dispatchAction(HOME_BANNERS,'findEPHomeBanners',query);
}

export function findHomePartnership(query) {
  return dispatchAction(HOME_PARTNERSHIP,'findEPHomePartnership',query);
}

export function findHomePartnershipDisplay(query) {
  return dispatchAction(HOME_PARTNERSHIP_VISIBILITY,'findEPHomePartnershipDisplay',query);
}

export function findHomeRegulations(query) {
  return dispatchAction(HOME_REGULATIONS,'findEPHomeRegulations',query);
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

export function findHomeSPROs(query) {
  return dispatchAction(HOME_SPROS,'findEPHomeSPROs',query);
}

export function findHomeWorkshops(query) {
  return dispatchAction(HOME_WORKSHOPS,'findEPHomeWorkshops',query);
}

export function findHomeShipyards(query) {
  return dispatchAction(HOME_SHIPYARDS,'findEPHomeShipyards',query);
}

export function findHomeOthers(query) {
  return dispatchAction(HOME_OTHERS,'findEPHomeOthers',query);
}

export function findHomeCounts(query) {
  return dispatchAction(HOME_COUNTS,'findEPHomeCounts',query);
}
