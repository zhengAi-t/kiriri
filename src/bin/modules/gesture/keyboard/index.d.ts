interface KeyEventsystem{
  //事件系统,可以在这里监听事件
  //事件名称为 xxx_up 或 xxx_down
  emit:(name:any,...argvs:any[])=>void;
  on:(name:any,callback:any)=>void;
  once:(name:any,callback:any)=>void;
  clear:(name:any,callback:any)=>void;
  append:(name:any,callback:any)=>void;
  appendOnce:(name:any,callback:any)=>void;
}
interface Capture{
  //事件系统,可以在这里监听事件
  //事件名称为 xxx_up 或 xxx_down
  event:KeyEventsystem,
  //按键状态
  keyStatus:{
    [propName:string]:boolean
  }
}
interface ShortCut{
  /**
   * 注册一个快捷键
   * key的书写形式 Meta+Number1+KeyQ
   * 回调为注册的函数
   */
  regist(key:string,callback:Function):void,
  /**
   * 取消注册一个快捷键
   * 参数和定义时一样
   */
  unregist(ket:string,callback:Function):void
}
export default interface Keyboard{
  shortcut:ShortCut,
  raw:Capture,
}