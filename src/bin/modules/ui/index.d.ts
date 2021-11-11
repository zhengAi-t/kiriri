export default interface UI{
  /** 传递信号 */
  siggnal(uiName:string,optName:string):void;
  /** 添加侦听的ui组件 */
  addUIframe(uiName:string,opts:object):void;
}