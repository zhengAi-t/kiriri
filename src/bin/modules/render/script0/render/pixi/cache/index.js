import application from '../../../../../buildup';
import * as PIXI from 'pixi.js';
let config={
  cacheName:'render-pixi-texture',
  getItem:async function(filename){
    let result=await (await application.file).read(filename);
    let size=result.size;
    result=await createImageBitmap(result);
    result=PIXI.Texture.from(result);
    let wasteName=result.textureCacheIds[0];
    PIXI.Texture.addToCache(result,filename);
    PIXI.Texture.removeFromCache(wasteName);
    return {texture:result,size}
  },
  getSize(item){
    return item.size;
  },
  destory(item){
    item.texture.destory(true);
  }
};
let cache;
async function initCache(){
  let init=await application.cache;
  cache=init.createCache(config);
}
async function getTexture(filename){
  if(!cache) await initCache();
  return (await cache.get(filename)).texture;
}
export default {
  getTexture
}