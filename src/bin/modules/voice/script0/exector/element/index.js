import './insts';
import env from './env';
import cache from './cache';
function exector(content,files){
  content.forEach(inst=>{
    setTimeout(()=>env.types[inst.type][inst.opt](inst,files),inst.delay||0);
  });
}
export default{
  exector,get:cache.get
}