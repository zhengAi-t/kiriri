import Event from '../../../lib/eventsys';
let event=Event.EventSys();
let keyStatus={};
import config from './config';
let keyMap={};
let keys=Object.keys(config.keyAlias);
keys.forEach(name=>config.keyAlias[name].forEach(s=>keyMap[s]=name));

window.addEventListener("keydown",handlKeydown);
window.addEventListener("keyup",handlKeyup);
window.addEventListener('blur',handlBlur);
function handlKeydown(e){
  let key=keyMap[e.code];
  e.preventDefault();
  e.stopPropagation()
  if(!key||keyStatus[key])return;
  keyStatus[key]=true;
  event.emit(key+'_down');
}
function handlKeyup(e){
  let key=keyMap[e.code];
  if(!key||!keyStatus[key])return;
  keyStatus[key]=false;
  event.emit(key+'_up');
}
function handlBlur(){
  for(let i in keyStatus){
    if(!keyStatus[i])continue;
    keyStatus[i]=false;
    event.emit(i+'_up');
  }
}
export default{event,keyStatus};