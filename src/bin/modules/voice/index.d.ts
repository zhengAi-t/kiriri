import {Event} from '../../lib/eventsys';
export default interface Voice{
  postCode(code:string):void;
  event:Event;
  prepareCode(code:{index:number,code:string}[],index:number):void;
}