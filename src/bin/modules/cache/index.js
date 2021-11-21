import BaseCache from '../../lib/cache';
import config  from './config';
let baseCache=BaseCache.createCache({
  maxSize:config.maxSize||(100*1024*1024),
  getItem:async (id)=>{
    let match=id.split('`');
    if(match.length!==2)return void(console.error('the name should not contain `'));
    let block=cacheBlocks.get(match[0]);
    if(!block)return void(console.error('cache not exist'));
    let item=await block.getItem(match[1]);
    return {item,type:match[0]};
  },
  getSize(item){
    let type=item.type;
    let block=cacheBlocks.get(type);
    if(!block)return void(console.error('cache not exist'));
    return block.getSize(item.item);
  },
  destory(item){
    let type=item.type;
    let block=cacheBlocks.get(type);
    if(!block)return void(console.error('cache not exist'));
    return block.destory(item.item);
  }
});
let cacheBlocks=new Map;
let cacheName=1;
function createCache(config){
  defaultCacheConfig(config);
  if(cacheBlocks.has(config.cacheName))return void(console.error('name exist'));
  cacheBlocks.set(config.cacheName,config);
  async function get(name){
    return (await baseCache.get(config.cacheName+'`'+name)).item;
  }
  config.cache={get};
  return config.cache;
}
function getCache(name){
  let block=cacheBlocks.get(name);
  if(!block)return void(console.warn('cache not exist'));
  return block.cache;
}
function defaultCacheConfig(config){
  if(!config.getItem)return void(console.error('getItem need'));
  config.cacheName=config.cacheName||cacheName++;
  console.info('createCache',config.cacheName);
  if(!config.getSize) console.warn('config.getsize is undefined');
  config.getSize=config.getSize||(()=>1024*1024);
  config.destory=config.destory||(()=>void(0));
}
if(config.application)config.application.cache={createCache,getCache};
export default{
  createCache,getCache
}