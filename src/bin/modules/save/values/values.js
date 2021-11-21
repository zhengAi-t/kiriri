let monitor;
export let init=config=>{
  let storage=config.storage;
  let data=storage.getItem('values')||{};
  let observer=Observer(data);
  let commit=()=>storage.save('values',data);
  monitor=config.monitor||(()=>0);
  return {commit,observer};
}
function Observer(object){
  if(typeof object!=='object'||object===null)return;
  let innerObject=Array.isArray(object)?[]:{};
  let proxyConfig={};
  proxyConfig.set=function(obj,p,value){
    if(typeof value==='object'&&value)innerObject[p]=Observer(value);
    else innerObject[p]=undefined;
    obj[p]=value;
    monitor();
    return true;
  }
  proxyConfig.get=function(obj,p){
    if(innerObject[p])return innerObject[p];
    return obj[p];
  }
  for(let i in object)innerObject[i]=Observer(object[i]);
  return new Proxy(object,proxyConfig);
}