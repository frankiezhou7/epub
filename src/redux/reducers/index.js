import routerReducer from './router';
import portReducer from './port';
import terminalReducer from './terminal';
import anchorageReducer from './anchorage';
import berthReducer from './berth';
import newsReducer from './news';
import newsItemReducer from './newsItem';
import homeReducer from './home';
import organizationReducer from './organization';
import recommendationReducer from './recommendation';
import searchReducer from './search';
import basicTypesReducer from './basicTypes';
import shipReducer from './ship';
import shipLimitReducer from './shipLimit';

export default function AppReducer(state={}, action) {
  return {
    routing: routerReducer(state.routing,action),
    port : portReducer(state.port,action),
    terminal : terminalReducer(state.terminal,action),
    berth : berthReducer(state.berth,action),
    anchorage : anchorageReducer(state.anchorage,action),
    news : newsReducer(state.news,action),
    newsItem : newsItemReducer(state.newsItem,action),
    home : homeReducer(state.home,action),
    organization : organizationReducer(state.organization,action),
    recommendation : recommendationReducer(state.recommendation,action),
    search : searchReducer(state.search,action),
    ship : shipReducer(state.ship,action),
    basicTypes : basicTypesReducer(state.basicTypes,action),
    shipLimitDatas: shipLimitReducer(state.shipLimitDatas,action),
  }
}
