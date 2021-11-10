/**
 * 专门定制的pixi缓存替换系统
 */
/**
 * 环形链表的构造函数
 */
function circle(){
  let pointer;
  function add(data){
    let item={data};
    if(!pointer){
      pointer=item;
      item.next=item;
      return;
    }
    item.next=pointer.next;
    pointer.next=item;
  }
  function next(){
    if(!pointer)return;
    pointer=pointer.next;
    return pointer.next.data;
  }
  function remove(){
    if(!pointer)return;
    if(pointer.next===pointer){
      pointer=undefined;
      return;
    }
    pointer.next=pointer.next.next;
  }
  return {next,add,remove};
}
let maxSize=100*1024*1024;
let countSize=0;
export let setCacheSize=size=>maxSize=size;
let cache=circle();
let allItems=new Map;
function turnReplaceCache(item,size,callback){
  countSize+=size;
  let data={size,liveCnt:1,item};
  cache.add(data);
  allItems.set(item,data);
  while(countSize>=maxSize){
    let now=cache.next();
    now.liveCnt--;
    if(now.liveCnt>0)continue;
    cache.remove();
    allItems.delete(now.item);
    countSize-=now.size;
    callback(item);
  }
}
function countCache(item){
  allItems.get(item).liveCnt++;
}
export default{
  turnReplaceCache,
  countCache
}