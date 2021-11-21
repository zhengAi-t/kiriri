/**
 * UI框架的统一接口
 * create,destory,operate
 * create,创建一个UI实体，初始化，申请资源,不包含显示方法
 * destory,销毁实体,释放资源,注意不包含隐藏方法
 * operate动作,提供各种操控UI类的方法
 */
/**
 * signal(name,opt);
 * 
 */
function signal(name,opt,config){
  let ui=UIObjects[name];
  if(!ui||!ui[opt])return;
  ui[opt].call(ui,config);
}
let UIObjects={};
function addUIframe(name,UIObject){
  if(!check(UIObject))return;
  UIObjects[name]=UIObject;
}
/**
 * 确认UI对象的合法性
 */
function check(UIObject){
  if(typeof UIObject!=='object')return false;
  let keys=Object.keys(UIObject);
  for(let i of keys){
    if(typeof UIObject[i]!=='function')return false;
  }
  return true;
}
let ui={
  signal,addUIframe
};
import application from "../buildup";
application.ui=ui;
import './UIframes/index';
export default ui;