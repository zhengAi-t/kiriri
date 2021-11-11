/**
 * 深拷贝函数
 */
function deepCopy(obj){
  let set=new Map;
  function deepcopy(obj){
    if(typeof obj!=='object')return obj;
    if(set.has(obj))return set.get(obj);
    let result=Array.isArray(obj)?[]:{};
    let keys=Object.keys(obj);
    for(let i of keys)result[i]=deepCopy(obj[i]);
    set.set(obj,result);
    return result;
  }
  return deepcopy(obj);
}
export default{
  deepCopy
}