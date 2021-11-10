import Cache from "../../../../../../lib/cache";
import env from "../env";
import config from './config';
import application from '../../../../../../lib/buildup';
import * as PIXI from 'pixi.js';
env.Cache=Cache;
env.cache=Cache.createCache({
  maxSize:config.maxSize,
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
});
async function getTexture(filename){
  let item=await env.cache.get(filename);
  return item.texture;
}
export default {
  getTexture
}