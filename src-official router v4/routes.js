import React from 'react';
import {IndexRoute, Route} from 'react-router';
//import loadComponent from './utils/asyncLoader';
//import Bundle from './bundle'
import { Master } from './components';
import {  Canvas, Canvas2, Login, Register, Status, Forget, SetPassword, AgencyDesk, News, About, NewsDetail, PortCanvas, PortDetail,
         Ship, TerminalDetail, AnchorageDetail, Organization, Regulation, RegulationDetail,
         Search, ErrorCanvas, NotFound , ErrorPage, PortIndex } from './pages';
import { Reset } from './components/DialogView';

import Home from './pages/home/Home'

export default [
  {
    path: '/',
    exact:true,
    preLoad:Home,
    render: (props) =>  (<Master><Home {...props}/></Master>)
  }, {
    path: '/agency-desk',
    render: (props) =>  (<Master><Canvas><AgencyDesk {...props}/></Canvas></Master>)
  },{
    path: '/news',
    exact:true,
    preLoad:News,
    render: (props) => (<Master><Canvas><News {...props}/></Canvas></Master>)
  },{
    path: '/news/:newsId',
    //exact:true,
    preLoad:NewsDetail,
    render: (props) => (<Master><Canvas><NewsDetail {...props}/></Canvas></Master>)
  },{
    path:'/login',
    render: (props) => (<Master><Canvas2><Login {...props}/></Canvas2></Master>)
  },{
    path:'/register',
    render: (props) => (<Master><Canvas2><Register {...props}/></Canvas2></Master>)
  },{
    path:'/regulations',
    exact:true,
    preLoad:Regulation,
    render: (props) => (<Master><Canvas><Regulation {...props}/></Canvas></Master>)
  },{
    path:'/regulations/:regulationId',
    preLoad:RegulationDetail,
    render: (props) => (<Master><Canvas><RegulationDetail {...props}/></Canvas></Master>)
  },{
    path:'/organization/:organizationId',
    preLoad:Organization,
    render: (props) => (<Master><Canvas><Organization {...props}/></Canvas></Master>)
  },{
    path:'/ship/:shipId',
    preLoad:Ship,
    render: (props) => (<Master><Canvas><Ship {...props}/></Canvas></Master>)
  },{
    path:'/about-us',
    render: (props) => (<Master><Canvas><About {...props}/></Canvas></Master>)
  },{
    path:'/search',
    exact:true,
    preLoad:Search,
    render: (props) => (<Master><Canvas><Search {...props}/></Canvas></Master>)
  },{
    path:'/ports',
    exact:true,
    preLoad:PortIndex,
    render: (props) => (<Master><Canvas><PortIndex {...props}/></Canvas></Master>)
  },{
    path:'/port/:portId',
    preLoad:[PortCanvas,PortDetail],
    render: (props) => (<Master><Canvas><PortCanvas {...props}><PortDetail {...props}/></PortCanvas></Canvas></Master>)
  },{
    path:'/port/:portId/terminal/:terminalId',
    preLoad:[PortCanvas,TerminalDetail],
    render: (props) => (<Master><Canvas><PortCanvas><TerminalDetail {...props}/></PortCanvas></Canvas></Master>)
  },{
    path:'/port/:portId/anchorage/:anchorageId',
    preLoad:[PortCanvas,TerminalDetail],
    render: (props) => (<Master><Canvas><PortCanvas><AnchorageDetail {...props}/></PortCanvas></Canvas></Master>)
  },{
    path:'/reset',
    preLoad:Reset,
    render: (props) => (<Master><Reset {...props}/></Master>)
  },{
    path:'/404',
    render: (props) => (<Master><NotFound {...props}/></Master>)
  },{
    render: (props) => (<Master><NotFound {...props}/></Master>)
  }
]