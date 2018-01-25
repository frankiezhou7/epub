import _ from 'eplodash';

export const SEARCH_TYPES = {
  PORT: 'Port',
  COMPANY: 'Company',
  SHIP: 'Ship',
  NEWS: 'News'
};

export const ALL_TYPES ={
  PORT:'Port',
  AGENCY: 'Agency',
  SUPPLIER: 'Supplier',
  SPRO: 'SPRO',
  INSPECTION: 'Inspection',
  WORKSHOP: 'Workshop',
  MANAGEMENT: 'Management',
  SHIPPER: 'Shipper',
  RECEIVER: 'Receiver',
  OWNER: 'Owner',
  CHARTERER: 'Charterer',
  OTHERS : 'Others',
  NEWS: 'News',
  SHIP: 'Ship',
  RECOMMENDATION: 'Recommendation',
};

export const TYPES_CODE = {
  AGENCY: 'ORGA',
  SUPPLIER: 'ORSP',
  SPRO: 'ORSR',
  INSPECTION: 'ORIN',
  WORKSHOP: 'ORWS',
  MANAGEMENT: 'ORSM',
  SHIPPER: 'ORSH',
  RECEIVER: 'ORRC',
  OWNER: 'ORSO',
  CHARTERER: 'ORCT',
  SHIPYARD: 'ORSY',
  PORT: 'PORT',
  NEWS: 'NEWS',
  SHIP: 'SHIP',
  RECOMMENDATION: 'RECOMMENDATION',
  OTHERS: 'OROT',
};

export const PORT_TYPES = [];
export const COMPANY_TYPES = _.pick(TYPES_CODE, ['WORKSHOP','AGENCY','SUPPLIER','SHIPYARD','SPRO','INSPECTION','MANAGEMENT','SHIPPER','RECEIVER','OWNER','CHARTERER']);
export const NEWS_TYPES = [];
export const SHIP_TYPES = [];
export const CATEGORY_TYPES = _.pick(ALL_TYPES, ['PORT','AGENCY','SUPPLIER','SPRO','OTHERS','NEWS','INSPECTION','WORKSHOP','RECOMMENDATION','SHIP']);

export const TYPES = {
  SEARCH_TYPES: SEARCH_TYPES,
  ALL_TYPES: ALL_TYPES,
  PORT_TYPES: PORT_TYPES,
  COMPANY_TYPES: COMPANY_TYPES,
  NEWS_TYPES: NEWS_TYPES,
  SHIP_TYPES: SHIP_TYPES
}
