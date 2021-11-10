let env={};
import application from '../../../../../lib/buildup';
application.file.then(file=>env.file=file);
import * as PIXI from 'pixi.js';
env.PIXI=PIXI;
console.log(window.env=env);
/**
 * 事件
 */
import Event from '../../../../../lib/eventsys';
env.event=Event.EventSys();
/**
 * 返回窗口信息
 * {x,y,w,h}
 */
let info={};
function signal(element){
  let view=element;
  let x=view.offsetLeft+view.clientLeft;
  let y=view.offsetTop+view.clientTop;
  let w=view.offsetWidth;
  let h=view.offsetHeight;
  info={x,y,w,h};
}
let getWindow=()=>info;
env.windowInfo={signal,getWindow};
/**
 * 修改窗口
 * 支持修改位置
 */
export function modifyWindow(canvas){
  env.app.resizeTo=canvas;
  env.windowInfo.signal(canvas);
}
/**
 * 启动这个模块
 */
env.app=null;
export function launch(view){
  env.app=new PIXI.Application({
    view,
    width:view.width,
    height:view.height
  });
  env.app.stage.sortableChildren=true;
  env.windowInfo.signal(view);
}
/**
 * 所有画布中的元素
 */
env.sprites=new Map;
/**
 * 所有正在运行的动画
 */
env.animates=new Map;
export default env;