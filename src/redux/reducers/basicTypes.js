import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const BASIC_TYPE_SHIP = 'BASIC_TYPE_SHIP';

const acceptActions =[BASIC_TYPE_SHIP];

const callBacks ={
  BASIC_TYPE_SHIP : (action)=>{
    return {
      basicTypes:{
        ship: action.response.types
      }
    }
  },
};

const initState = {
  isFetching: false,
  basicTypes:{
    ship:{
      shipTypes: [],
      shipStatusTypes:[],
      classifications:[],
      organizationRoles:[],
      piclubs:[]
    }
  }
}

export default function basicTypesReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findBasicShipTypes(query) {
  return dispatchAction(BASIC_TYPE_SHIP,'findEPBasicShipTypes',query);
}
