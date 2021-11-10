/**
 * 功能,快捷键管理,可用于各种按键平台
 * 需要初始化一个按键捕捉器{capture:{
 *  event:事件系统，
 *  keyStstus:按键状态
 * }}
 */
import capture from './capture';
//所有快捷键
//[n]:{add,remove}
let collects={};
/**
 * 开始监听管理一个键
 */
function listen(key){
  //{[n]:[func]}
  //所有种类的快捷键激活其他匹配按键
  let matchs={'None':[]};
  //实际的监听逻辑
  let event=capture.event;
  let keyStatus=capture.keyStatus;
  event.on(key+'_down',exector);
  function isMatch(matchKey){
    let keys=matchKey.split('+');
    for(let i of keys){
      if(keyStatus[i])continue;
      return false;
    }
    return true;
  }
  function exector(){
    let maxMatchLength=0;
    let matchCallback;
    for(let i in matchs){
      if(i==='None')continue;
      if(!matchs[i].length)continue;
      if(!isMatch(i))continue;
      let matchLength=i.split('+').length;
      if(matchLength<=maxMatchLength)continue;
      maxMatchLength=matchLength;
      matchCallback=matchs[i][matchs[i].length-1];
    }
    if(matchCallback) return matchCallback();
    if(matchs['None'].length){
      matchs['None'][matchs['None'].length-1]();
    }
  }
  //监听器数量
  let count=0;
  /**
   * 添加某个快捷键
   */
  function add(matchKey,callback){
    count++;
    if(matchKey===''){
      matchs['None'].push(callback);
      return;
    }
    if(!matchs[matchKey]){
      matchs[matchKey]=[];
    }
    matchs[matchKey].push(callback);
  }
  /**
   * 移除某个快捷键
   */
  function remove(matchKey,callback){
    if(matchKey==='')matchKey='None';
    if(!matchs[matchKey])return;
    let stack=matchs[matchKey];
    for(let i=0,l=stack.length;i<l;i++){
      if(stack[i]!==callback)continue;
      stack.splice(i,1);
      count--;
      break;
    }
    if(count>0)return;
    event.clear(key+'_down',exector);
    collects[key]=undefined;
  }
  collects[key]={add,remove};
}
/**
 * 注册某个快捷键
 */
function regist(key,callback){
  let keys=key.split('+');
  key=keys.pop();
  let matchKey=keys.join('+');
  if(!collects[key])listen(key);
  collects[key].add(matchKey,callback);
}
/**
 * 取消注册某个快捷键
 */
function unregist(key,callback){
  let keys=key.split('+');
  key=keys.pop();
  let matchKey=keys.join('+');
  if(!collects[key])return;
  collects[key].remove(matchKey,callback);
}
export default{
  regist,unregist
};

