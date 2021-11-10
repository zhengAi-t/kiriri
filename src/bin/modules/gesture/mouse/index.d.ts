interface Capture{
  watch(name:string,callback:Function):void,
  unwatch(name:string,callback:Function):void
}
interface Area{
  destory():void,
  on(name:string,callback:Function):void,
  cancel(name:string,callback:Function):void
}
interface AreaUtil{
  createArea(x:number,y:number,w:number,h:number):Area
}
interface Mouse{
  raw:Capture,
  area:AreaUtil
}
declare var mouse:Mouse;
export default mouse;