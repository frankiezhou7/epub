import _ from 'eplodash';
import { dispatchAction, registeActions } from '../utils/helper';
import cache from '../../cache';

const {
  SESSION_ID,
  DEVICE_ID,
} = cache;

const USER_EXISTS = 'USER_EXISTS';
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const FETCH_ME = 'FETCH_ME';
const RESEND_EMAIL = 'RESEND_EMAIL';
const VERIFY_EMAIL_TOKEN = 'VERIFY_EMAIL_TOKEN';
const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';
const REGISTER_COMPANY = 'REGISTER_COMPANY';
const RETRIEVE_PASSWORD = 'RETRIEVE_PASSWORD';
const RESET_PASSWORD = 'RESET_PASSWORD';
const VERIFY_PASSWORD_TOKEN = 'VERIFY_PASSWORD_TOKEN';
const AGENCY_DESK_URL = 'AGENCY_DESK_URL';
const acceptActions =[USER_EXISTS,LOG_IN,FETCH_ME,RESEND_EMAIL,VERIFY_EMAIL_TOKEN,UPDATE_USER_STATUS,LOG_OUT,REGISTER_COMPANY,RETRIEVE_PASSWORD,RESET_PASSWORD,VERIFY_PASSWORD_TOKEN, AGENCY_DESK_URL];

const callBacks ={
  USER_EXISTS: (action)=>{
    return {
      exists:{
        exists: action.response.user.exists,
        date: new Date(),
      },
    }
  },
  FETCH_ME : (action)=>{
    cache.set(cache.LOCAL, action.response.user);

    return {
       user: action.response.user,
       error: {},
    }
  },
  LOG_IN : (action)=>{
    cache.set(cache.LOCAL, action.response.user);

    return {
       user: action.response.user,
       error: {},
    }
  },
  LOG_OUT: (action)=>{
    cache.remove(SESSION_ID);
    return {
       user: {},
       error: {},
    }
  },

  REGISTER_COMPANY: (action)=>{
    return {
       userRegister: action.response.user,
       registerError: {},
    }
  },

  RESEND_EMAIL: (action)=>{
    return {
      userResendEmail: action.response.user,
      error: {},
    }
  },

  VERIFY_EMAIL_TOKEN: (action)=>{
    return {
      user: action.response.user,
      error: {},
    }
  },

  UPDATE_USER_STATUS: (action)=>{
    return {
      user: action.response.user,
      error: {},
    }
  },

  RETRIEVE_PASSWORD: (action)=>{
    return {
       info: action.response.user.response,
    }
  },

  RESET_PASSWORD: (action)=>{
    return {
       reset: action.response.user,
    }
  },

  VERIFY_PASSWORD_TOKEN: (action)=>{
    return {
       verify: action.response.user,
    }
  },
  AGENCY_DESK_URL: (action)=>{
    return {
       url: action.response.url,
    }
  },
};

const callFails ={
  LOG_IN : (err,action)=>{
    return {
      user:{},
      error: err,
    }
  },
  REGISTER_COMPANY : (err,action)=>{
    return {
      user:{},
      registerError: err,
    }
  },
  RESEND_EMAIL : (err,action)=>{
    return {
      user:{},
      registerError: err,
    }
  },
  RETRIEVE_PASSWORD : (err,action)=>{
    return {
       info: {},
       error: err,
    }
  },
  RESET_PASSWORD : (err,action)=>{
    return {
       reset: {},
       failed: err,
    }
  },
  VERIFY_PASSWORD_TOKEN : (err,action)=>{
    return {
       verify: {},
       invalid: err,
    }
  },
  AGENCY_DESK_URL : (err,action)=>{
    return {
       url: '',
       error: err,
    }
  },
};

const initState = { isFetching:false, user:{} };

export default function userReducer(state =initState, action) {
  return registeActions(state,action,acceptActions,callBacks,callFails);
}

export function login(query) {
  return dispatchAction(LOG_IN,'login',query);
}

// 添加重新发送邮件
export function resendEmail(query) {
  return dispatchAction(RESEND_EMAIL, 'resendEmail', query);
}

// 添加验证邮箱token
export function verfiyEmailToken(query) {
  return dispatchAction(VERIFY_EMAIL_TOKEN, 'verfiyEmailToken', query);
}

// 添加修改用户状态
export function updateUserStatus(query) {
  return dispatchAction(UPDATE_USER_STATUS, 'updateUserStatus', query);
}

export function retrievePassword(query) {
  return dispatchAction(RETRIEVE_PASSWORD,'retrievePassword',query);
}

export function resetPassword(query) {
  return dispatchAction(RESET_PASSWORD,'resetPassword',query);
}

export function verifyPasswordToken(query) {
  return dispatchAction(VERIFY_PASSWORD_TOKEN,'verifyPasswordToken',query);
}

export function fetchMe(query) {
  return dispatchAction(FETCH_ME,'fetchMe',query);
}

export function logout(query) {
  return dispatchAction(LOG_OUT,'logout',query);
}

export function register(query) {
  return dispatchAction(REGISTER_COMPANY,'registerCompany',query);
}

export function userExists(query) {
  return dispatchAction(USER_EXISTS,'userExists',query);
}

export function fetchAgencyDeskUrl(query) {
  return dispatchAction(AGENCY_DESK_URL,'fetchAgencyDeskUrl',query);
}
