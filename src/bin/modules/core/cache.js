/**
 * 这里用来描述核心中的脚本缓存系统
 * 缓存的是编译之后的结果
 */
import application from '../buildup';
import env from './env';
let cache;
let config={
  cacheName:'core-script',
  getItem:function(name){
    env.event.emit("requestScript",name);
    return new Promise(rs=>{
      env.event.once("requestScriptReturn",script=>rs(script));
    });
  },
  getSize(item){
    let result=0;
    result+=item.main.length;
    let keys=Object.keys(item.blocks);
    keys.forEach(k=>result+=item.blocks[k].length);
    return result*64;
  }
};
async function initCache(){
  let baseCacheinit=await application.cache; 
  if(!baseCacheinit)return void(console.error('no cache constructor'));
  cache=baseCacheinit.createCache(config);
}
async function get(name){
  if(!cache) await initCache();
  return cache.get(name);
}
env.cache={get};