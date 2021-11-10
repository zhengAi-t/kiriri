/**
 * 提供按照层次化结构的鼠标手势管理
 */
//链表的数据结构
let chain=(()=>{
  let head;
  function push(node){
    node={node};
    node.after=head;
    if(head)head.before=node;
    head=node;
  }
  function remove(node){
    let thisNode=head;
    while(thisNode){
      if(thisNode.node!==node){
        thisNode=thisNode.after;
        continue;
      }
      if(thisNode.after)thisNode.after.before=thisNode.before;
      if(!thisNode.before)head=thisNode.after;
      else thisNode.before.after=thisNode.after;
      break;
    }
  }
  let top=()=>head;
  return {push,remove,top};
})();
/**
 * 创建一个矩形点击区域
 */
import normal from "./normal";
function createArea(x,y,w,h){
  let node={x,y,w,h,events:{}};
  chain.push(node);
  /**
   * destory 销毁
   * on 监听
   * cancel取消
   */
  function on(name,callback){
    let events=node.events;
    if(!events[name])events[name]=new Set;
    events[name].add(callback);
    //某个事件的监听计数增加，只要有监听计数，
    //那么系统就应该继续监听这个事件，否则可以取消监听了
    (normal[name]||normal['mousemove']).up();
  }
  function cancel(name,callback){
    let events=node.events;
    if(!events[name])return;
    events[name].delete(callback);
    //某个事件的监听计数减少，只要有监听计数，
    //那么系统就应该继续监听这个事件，如果监听计数被减小到零，
    //系统自动取消监听这个事件
    (normal[name]||normal['mousemove']).down();
  }
  function destory(){
    chain.remove(node);
    let events=node.events;
    for(let i in events){
      if(!events[i])continue;
      let size=events[i].size;
      while(size--)(normal[i]||normal['mousemove']).down();
    }
  }
  return {destory,on,cancel};
}
/**
 * 正规化的数据
 * name的值为 mouseup mousedown click 
 *  mousein mouseout mousemove
 */
export function dispatch(name,x,y){
  //处理mouseIn和out的补丁
  if(name==='mousemove')return patch(x,y);
  let top=chain.top();
  while(top){
    if(!isIn({x,y},top.node)){
      top=top.after;
      continue;
    }
    let events=top.node.events;
    if(events[name].size===0)return;
    events[name].forEach(s=>s(x,y));
    break;
  }
}
/**
 * 处理in和out的补丁
 */
function patch(x,y){
  let top=chain.top();
  let inOk=false,outOk=false,moveOk=false;
  while(top){
    let node=top.node;
    top=top.after;
    let lastIn=node.in||false;
    let nowIn=isIn({x,y},node);
    node.in=!inOk&&nowIn;
    if(lastIn!==node.in){
      if(!inOk&&nowIn&&node.events['mousein'])node.events['mousein'].forEach(s=>s(x,y));
      if(!outOk&&lastIn&&node.events['mouseout'])node.events['mouseout'].forEach(s=>s(x,y));
      outOk=lastIn||outOk;
    }
    inOk=inOk||nowIn;
    if(!inOk&&nowIn&&node.events['mousemove'])node.events['mousemove'].forEach(s=>s(x,y));
    if(inOk&&outOk)break;
  }
}
/**
 * 判定点是否在区域里面
 * point 画布内标准化的位置
 */
function isIn(point,area){
  return point.x>=area.x&&point.y>=area.y&&
         point.x<=area.x+area.w&&
         point.y<=area.y+area.h;
}
export default{
  createArea
}