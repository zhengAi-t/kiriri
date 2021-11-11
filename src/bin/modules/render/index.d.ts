import {Event} from '../../lib/eventsys';
export interface windowInfo{
  x:number;
  y:number;
  w:number;
  h:number;
}
export default interface Render{
  // {postCode,event:render.event,getWindow:render.getWindow}
  //向这个模块投递代码
  postCode(code:string):void;
  event:Event;
  getWindow():windowInfo;
}