import _ from 'eplodash';

export const display = (item, unit)=>{
  return item ? unit ? item+' '+unit : item : '-';
}

export const displayWithLimit = (str,number)=>{
  if(!str) return '';
  if(!number) return str;
  return str.length>number ? str.substring(0,number)+'...': str;
};

export const getRegionPosition = (region)=>{
  let positions = [];
  if(!region || !region.points || region.points.length ===0 ) return '-';
  positions = _.map(region.points,(point)=>{
    let step = point.longitude ? ', ': '';
    return point.longitude+step+point.latitude;
  });
  return positions;
};

export const getValueByLabel = (methods,label)=>{
  let value = ' - ';
  _.forEach(methods,(method)=>{
    if(method.type && method.type === label){
      value = method.value;
    }
  });
  return value;
};

export const getNameByCode = (types,typeCode)=>{
  let o = _.find(types,(type)=> type && type.code===typeCode);
  return o ? o.name : '-';
};

export const getNamesByCode = (types,typeCodes)=>{
  return _.map(typeCodes,code=> getName(types,code));
};
