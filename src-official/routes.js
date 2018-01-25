import React from 'react';
import {IndexRoute, Route} from 'react-router';
import loadComponent from './utils/asyncLoader';
import { Master } from './components';
import { Home, Canvas, Canvas2, Login, Register, Status, Forget, SetPassword, AgencyDesk, News, About, NewsDetail, PortCanvas, PortDetail,
         Ship, TerminalDetail, AnchorageDetail, Organization, Regulation, RegulationDetail,
         Search, ErrorCanvas, NotFound , ErrorPage, PortIndex } from './pages';
import { Reset } from './components/DialogView';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={Master}>
      <IndexRoute getComponent={loadComponent(Home)}/>
      <Route getComponent={loadComponent(Canvas2)}>
        <Route path="login" getComponent={loadComponent(Login)} />
        <Route path="register" getComponent={loadComponent(Register)} />
        <Route path="status" getComponent={loadComponent(Status)} />
        <Route path="forget" getComponent={loadComponent(Forget)} />
        <Route path="setPassword" getComponent={loadComponent(SetPassword)} />
      </Route>
      <Route getComponent={loadComponent(Canvas)}>
        <Route path="agency-desk" getComponent={loadComponent(AgencyDesk)} />
        <Route path="about-us" getComponent={loadComponent(About)} />
        <Route path="news" getComponent={loadComponent(News)} />
        <Route path="news/:newsId" getComponent={loadComponent(NewsDetail)} />
        <Route path="agency-desk" getComponent={loadComponent(About)} />
        <Route path="regulations" getComponent={loadComponent(Regulation)} />
        <Route path="regulations/:regulationId" getComponent={loadComponent(RegulationDetail)} />
        <Route path="/organization/:organizationId" getComponent={loadComponent(Organization)} />
        <Route path="ports" getComponent={loadComponent(PortIndex)} />
        <Route getComponent={loadComponent(PortCanvas)}>
          <Route path="/port/:portId" getComponent={loadComponent(PortDetail)} />
          <Route path="/port/:portId/terminal/:terminalId" getComponent={loadComponent(TerminalDetail)} />
          <Route path="/port/:portId/anchorage/:anchorageId" getComponent={loadComponent(AnchorageDetail)} />
        </Route>
        <Route path="/ship/:shipId" getComponent={loadComponent(Ship)} />
        <Route path="/search" getComponent={loadComponent(Search)} />
      </Route>
      <Route path="/reset" getComponent={loadComponent(Reset)} />
      <Route path="/404" getComponent={loadComponent(NotFound)} status={404} />
      <Route path="*" getComponent={loadComponent(NotFound)} status={404} />
      <Route path="*" getComponent={loadComponent(ErrorPage)} status={500} />
    </Route>
  )
};
