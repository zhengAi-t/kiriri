import application from '../../../../../buildup';
let config={
  cacheName:'voice-url',
  getItem:async function(filename){
    let blob=await(await application.file).read(filename);
    let url=URL.createObjectURL(blob);
    return {url,size:blob.size,filename}
  },
  getSize(item){
    return item.size;
  },
  destory(item){
    URL.revokeObjectURL(item.url);
  }
};
let cache=application.cache.then(init=>init.createCache(config));
async function get(name){
  if(cache.constructor===Promise) cache= await cache;
  return (await cache.get(name)).url;
}
export default {get};