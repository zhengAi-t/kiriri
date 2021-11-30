import config from "./config";
import env from './env';
if(config.script.postCode)console.error('postCode needed');
if(config.script.prepareCode)console.warn('prepareCode meeded');
let mudule={
  postCode:config.script.postCode,
  prerareCode:config.script.prepareCode||(()=>void(0)),
  event:env.event
}
import application from '../buildup';
application.voice=mudule;
export default mudule;