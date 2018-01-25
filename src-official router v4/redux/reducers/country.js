import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';


const LIST_COUNTRIES = 'LIST_COUNTRIES'
const acceptActions =[LIST_COUNTRIES];

const callBacks ={
  LIST_COUNTRIES : (action)=>{

    return {
       country: action.response.countries,
    }
  },
};



const initState = { isFetching:false, country:[] };

export default function countryReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function listCountries(query) {
  return dispatchAction(LIST_COUNTRIES,'listCountries',query);
}
