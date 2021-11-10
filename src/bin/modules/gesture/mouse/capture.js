/**
 * 鼠标事件难于定制编程，
 * 直接采用现有的对于鼠标事件的抽象
 * 这里捕捉鼠标动作
 * 限制事件触发频率0.1
 */
import application from '../../../lib/buildup';
let render;
application.render.then(render_=>render=render_);
import throttle from '../../../lib/throttle';
//{[name]:Set}所有用户的监听器函数
let events=new Map;
//所有实际代理执行的监听器函数
let eventHandls=new Map;
function enableEventHandl(name){
  if(eventHandls.has(name))return;
  let throttler=throttle.throttle(100);
  let listeners=new Set;
  events.set(name,listeners);
  eventHandls.set(name,handl);
  function handl(event){
    event.preventDefault();
    throttler(()=>{
      let info=render.getWindow();
      let x=(event.clientX-info.x)/info.w;
      let y=(event.clientY-info.y)/info.h;
      listeners.forEach(s=>s(x,y));
    });
  }
  window.addEventListener(name,handl);
}
function watch(name,callback){
  enableEventHandl(name);
  events.get(name).add(callback);
}
function unwatch(name,callback){
  if(!events.has(name))return void(console.warn('event not exist'));
  let listeners=events.get(name);
  if(callback)listeners.delete(callback);
  else listeners.clear();
  if(listeners.size>0)return;
  events.delete(name);
  window.removeEventListener(name,eventHandls.get(name));
  eventHandls.delete(name);
}
export default{watch,unwatch};