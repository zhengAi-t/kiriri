import {Inst} from '../compile/inst';
interface Script{
  /**
   * 文件名
   */
  filename?:string,
  /**
   * 名称
   */
  name?:string,
  /**
   * 脚本
   */
  content:Inst[]
}
interface stackInfo{
  filename?:string,
  name?:string,
  index:number
}
interface Snapshot{
  stack:stackInfo[],
  values:{
    [propName:string]:any
  }
}
interface Eventsys{
  emit:(name:any,...argvs:any[])=>void;
  on:(name:any,callback:any)=>void;
  once:(name:any,callback:any)=>void;
  clear:(name:any,callback:any)=>void;
  append:(name:any,callback:any)=>void;
  appendOnce:(name:any,callback:any)=>void;
}
interface Core{
  /**
   * 现有事件
   * requestUI
   * requestUIReturn
   * requestVoice
   * requestRender
   * requestScript
   * requestScriptReturn
   * requestExtension
   * ...
   */
  event:Eventsys,
  /**
   * 载入脚本，
   * 覆盖当前执行状态
   */
  loadScript(script:Script):void,
  /**
   * 推入脚本
   * 挂起当前脚本，并在当前环境执行新脚本
   */
  pushScript(script:Script):void,
  /**
   * 获取当前状态快照
   */
  takeSnapshot():Snapshot,
  /**
   * 恢复快照状态
   */
  loadSnapshot(snapshot:Snapshot):void,
  /**
   * 继续
   */
  goOn():void,
  /**
   * 核心锁定,
   * 核心锁定之后，不会继续往后运行，
   * 这个时间调用goon也是不会继续运行的
   */
  lock():void,
  /**
   * 核心解锁，
   * 如果在锁定期间请求过继续运行，将会在解锁的之后运行
   */
  unlock():void,
  /**
   * 长臂干涉状态
   */
  hand(config:object):any
}
declare var core:Core;
export default core;