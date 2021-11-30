/**
 * 创建一个任务队列
 */
function createQueue(config){
  if(!config.worker)return void(console.error('worker needed'));
  let queue=[],queueMap=new Map;
  let id=0,isworking=false,paused=false;
  function push(item){
    queue.push({item,id});
    queueMap.set(id,item);
    if(!isworking)work();
    return id++;
  }
  function cancel(handl){
    let item=queueMap.get(handl);
    if(!item)return void(console.warn('no such job'));
    item.iscancel=true;
    queueMap.delete(handl);
  }
  let pause=()=>paused=true;
  function goOn(){
    paused=false;
    if(!isworking&&queue.length)work();
  }
  async function work(){
    while(queue.length&&queue[0].iscancel){
      queueMap.delete(queue.pop().id);
    }
    if(queue.length&&!isworking&&!paused){
      isworking=true;
      if(config.onworking)config.onworking();
    }
    if(!queue.length||paused){
      if(isworking&&config.onidle)config.onidle();
      isworking=false;
      return;
    }
    let item=queue.shift();
    queueMap.delete(item.id);
    await config.work(item.item);
    work();
  }
  return{push,cancel,pause,goOn,tasks:queueMap};
}
export default {
  createQueue
}