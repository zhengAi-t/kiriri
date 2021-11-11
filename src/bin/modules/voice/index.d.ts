import {Event} from '../../lib/eventsys';
export default interface Voice{
  postCode(code:string):void;
  event:Event;
}