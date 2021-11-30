import config from './config';
import env from './env';
async function postCode(code){
  let decode=new TextDecoder();
  let blob=new Blob([code]);
  let buffer=await blob.arrayBuffer();
  code=decode.decode(buffer);
  config.script.postCode(code);
}
let module={
  postCode,
  event:env.event,
  getWindow:config.script.getWindow,
  prepareCode:config.script.prepareCode
};
import application from "../buildup";
application.render=module;
export default module;