import {Event} from '../../lib/eventsys';
interface Voice{
  postCode(code:string):void;
  event:Event;
  prepareCode(code:{index:number,code:string}[],index:number):void;
}
declare var voice:Voice;
export default voice;