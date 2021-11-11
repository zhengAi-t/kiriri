/**
 * 适合保存小文件高频快速
 */
function getItem(name){
  if(name||name===0){
    let raw=localStorage.getItem(name);
    if(!raw)return;
    return JSON.parse(raw).item;
  }
  let result={};
  for(let i=0,l=localStorage.length;i<l;i++){
    let key=localStorage.key(i);
    let raw=localStorage.getItem(key)||'{}';
    result[key]=JSON.parse(raw).item;
  }
  return result;
}
function setItem(name,item){
  localStorage.setItem(name,JSON.stringify({item}));
}
function clear(name){
  if(!name)return localStorage.clear();
  localStorage.removeItem(name);
}
export default{
  getItem,
  setItem,
  clear
}