/**
 * 这个模块提供了定义一个缓存的通用构造方法，
 * 缓存实现的功能，缓存缓存读取，缓存替换
 */
function createCache(config){
  if(!config.getItem)console.error('can getItem');
  config.maxSize=config.maxSize||(40*1024*1024);
  config.getSize=config.getSize||(()=>1024*1024);
  config.destory=config.destory||(()=>0);
  let head;
  let cacheSize=0;
  let itemBefores=new Map;
  //将节点加入环中
  function addCache(node){
    cacheSize+=node.size;
    if(!head)node.after=node,head=node;
    node.after=head.after;
    itemBefores.set(node.id,head);
    itemBefores.set(head.after.id,node);
    head.after=node;
    head=head.after;
  }
  function freeCache(){
    while(head&&cacheSize>config.maxSize){
      if(head.after===head){
        config.destory(head.item);
        cacheSize-=head.size;
        itemBefores.clear(),head=null;
        break;
      }
      if(head.after.count>0){
        head.after.count--;
        head=head.after;
        continue;
      }
      config.destory(head.after.item);
      cacheSize-=head.after.size;
      itemBefores.delete(head.after.id);
      head.after=head.after.after;
      itemBefores.set(head.after.id,head);
    }
  }
  async function get(id){
    if(!itemBefores.has(id)){
      let item=await config.getItem(id);
      let node={item,count:0,id,size:config.getSize(item)};
      if(node.size>=config.maxSize)return item;
      addCache(node);
    }
    let node=itemBefores.get(id).after;
    if(node.count<6)node.count++;
    freeCache();
    return node.item;
  }
  return {get}
}
export default{
  createCache
}