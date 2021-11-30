import config from './config';
let env={};
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
  info.x=x,info.y=y,info.w=w,info.h=h;
}
let getWindow=()=>info;
env.windowInfo={signal,getWindow};
/**
 * 修改窗口
 * 支持修改位置
 */
if(!config.toResize)console.warn('cant response resize');
else config.toResize(canvas=>{
  env.app.resizeTo=canvas;
  env.windowInfo.signal(canvas);
});
/**
 * 启动这个模块
 */
env.app=null;
if(!config.toLaunch)console.error('canvas needed');
config.toLaunch(view=>{
  env.app=new PIXI.Application({
    view,
    width:view.width,
    height:view.height
  });
  env.app.stage.sortableChildren=true;
  env.windowInfo.signal(view);
});
import * as PIXI from 'pixi.js';
env.PIXI=PIXI;
import gEnv from '../../../env';
env.event=gEnv.event;
env.sprites=new Map;
env.animates=new Map;
env.insts={};
import cache from './cache';
env.cache=cache;
export default env;