import Event from '../../lib/eventsys';
let EventSys=Event.EventSys;
let env={event:EventSys(),stack:[],values:{},instCollect:{}};

//默认的record
env.record={};
export let init=config=>env.record=config.record;
export default env;