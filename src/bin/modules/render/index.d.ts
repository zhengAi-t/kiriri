import {Event} from '../../lib/eventsys';
export interface windowInfo{
  x:number;
  y:number;
  w:number;
  h:number;
}
interface Render{
  // {postCode,event:render.event,getWindow:render.getWindow}
  //向这个模块投递代码
  postCode(code:string):void,
  event:Event,
  getWindow():windowInfo,
  prepareCode(content:{code:string,index:number}[],index:number):void;
}
declare var render:Render;
export default render;