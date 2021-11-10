/**
 * 需要导出的接口
 * event,exector,getWindow
 */
import env from './env';
import InstCollect from './inst/index';
import './config';
import './animate';
import './cache';
function exector(content){
  for(let i=0,l=content.length;i<l;i++){
    let inst=content[i];
    setTimeout(()=>InstCollect[inst.opt][inst.type||'default'](inst),inst.delay||0);
  }
}
export default {event:env.event,exector,getWindow:env.windowInfo.getWindow}