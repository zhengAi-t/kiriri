export interface Event{
  emit(name:string,...argvs:any):void;
  append(name:string,callback:Function):void;
  appendOnce(name:string,callback:Function):void;
  clear(name:string,callback:Function):void;
  on(name:string,callback:Function):void;
  once(name:string,callback:Function):void;
}
export default interface EventInit {
  EventSys():Event;
}