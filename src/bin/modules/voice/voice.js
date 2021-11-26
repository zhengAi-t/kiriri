import microTask from "../../lib/microTask";
function postCode(code){
  microTask.microTask(()=>script.postCode(code));
}
let script;
function init(config){
  script=config.script;
  return{postCode,event:script.event,prepareCode:script.prepareCode};
}
export default {
  init
}
