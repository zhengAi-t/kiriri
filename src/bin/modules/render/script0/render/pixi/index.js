/**
 * 需要导出的接口
 * event,exector,getWindow
 */
import env from './env';
//加载补丁
import Animate from './animate';
env.Animate=Animate;
import './inst';
function exector(content,files){
  content.forEach(inst=>{
    setTimeout(()=>env.insts[inst.opt][inst.type||'default'](inst,files),inst.delay||0);
  });
}
export default {
  exector,
  getWindow:env.windowInfo.getWindow,
  get:env.cache.getTexture
}