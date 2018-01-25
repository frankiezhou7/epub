import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';

const ORGANIZATION = 'ORGANIZATION';

const acceptActions =[ORGANIZATION];

const callBacks ={
  ORGANIZATION : (action)=>{ return { organization : action.response.organization } },
};

const initState = { isFetching : false, organization : {} };

export default function organizationReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks);
}

export function findOrganizationById(query) {
  return dispatchAction(ORGANIZATION,'findEPOrganizationById',query);
}
