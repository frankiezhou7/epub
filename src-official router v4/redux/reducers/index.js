import { routerReducer } from 'react-router-redux'
//import routerReducer from './router';
import portReducer from './port';
import terminalReducer from './terminal';
import anchorageReducer from './anchorage';
import berthReducer from './berth';
import newsReducer from './news';
import newsItemReducer from './newsItem';
import regulationReducer from './regulation';
import regulationItemReducer from './regulationItem';
import homeReducer from './home';
import organizationReducer from './organization';
import recommendationReducer from './recommendation';
import searchReducer from './search';
import basicTypesReducer from './basicTypes';
import shipReducer from './ship';
import shipLimitReducer from './shipLimit';
import userReducer from './user';
import countryReducer from './country';

export default function AppReducer(state={}, action) {
  return {
    routing: routerReducer(state.routing,action),
    port : portReducer(state.port,action),
    terminal : terminalReducer(state.terminal,action),
    berth : berthReducer(state.berth,action),
    anchorage : anchorageReducer(state.anchorage,action),
    news : newsReducer(state.news,action),
    newsItem : newsItemReducer(state.newsItem,action),
    regulations : regulationReducer(state.regulations,action),
    regulationItem : regulationItemReducer(state.regulationItem,action),
    home : homeReducer(state.home,action),
    organization : organizationReducer(state.organization,action),
    recommendation : recommendationReducer(state.recommendation,action),
    search : searchReducer(state.search,action),
    ship : shipReducer(state.ship,action),
    basicTypes : basicTypesReducer(state.basicTypes,action),
    shipLimitDatas: shipLimitReducer(state.shipLimitDatas,action),
    user: userReducer(state.user,action),
    country: countryReducer(state.country,action),
  }
}
