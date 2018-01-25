import React from 'react';
import {IndexRoute, Route} from 'react-router';
import loadComponent from './utils/asyncLoader';
import { Master } from './components';
import { Home, Canvas, News, NewsDetail, PortCanvas, PortDetail,
         Ship, TerminalDetail, AnchorageDetail, Organization,
         Search, ErrorCanvas, NotFound , ErrorPage } from './pages';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={Master}>
      <IndexRoute getComponent={loadComponent(Home)}/>
      <Route getComponent={loadComponent(Canvas)}>
        <Route path="news" getComponent={loadComponent(News)} />
        <Route path="news/:newsId" getComponent={loadComponent(NewsDetail)} />
        <Route path="/organization/:organizationId" getComponent={loadComponent(Organization)} />
        <Route getComponent={loadComponent(PortCanvas)}>
          <Route path="/port/:portId" getComponent={loadComponent(PortDetail)} />
          <Route path="/port/:portId/terminal/:terminalId" getComponent={loadComponent(TerminalDetail)} />
          <Route path="/port/:portId/anchorage/:anchorageId" getComponent={loadComponent(AnchorageDetail)} />
        </Route>
        <Route path="/ship/:shipId" getComponent={loadComponent(Ship)} />
        <Route path="/search" getComponent={loadComponent(Search)} />
      </Route>
      <Route path="/404" getComponent={loadComponent(NotFound)} status={404} />
      <Route path="*" getComponent={loadComponent(NotFound)} status={404} />
      <Route path="*" getComponent={loadComponent(ErrorPage)} status={500} />
    </Route>
  )
};
