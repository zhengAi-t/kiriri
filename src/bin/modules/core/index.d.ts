import {Inst} from '../compile/inst';
interface Script{
  /**
   * 文件名
   */
  filename:string,
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
  filename:string,
  name:string,
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
   * requestComponent 组件事件请求，流程挂起
   * componentReturn  组件操作完成，流程继续
   * requestScript    加载脚本请求，流程挂起
   * scriptGot        脚本已经获得，流程继续
   * requestSetRecord 请求绑定record
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
   * 长臂干涉状态
   */
  hand(config:object):any
}
declare var core:Core;
export default core;