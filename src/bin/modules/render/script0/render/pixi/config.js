import {launch,modifyWindow} from './env';
//游戏屏幕比例
let screenType=1920/1080;
function start(){
  let canvas=document.createElement('canvas');
  let windowWidth=window.innerWidth;
  let windowHeight=window.innerHeight;
  let width=Math.min(windowWidth,windowHeight*screenType);
  let height=Math.min(windowHeight,windowWidth/screenType);
  width=Math.max(700,width);
  height=Math.max(700/screenType,height);
  canvas.width=width;
  canvas.height=height;
  document.body.style.margin='0';
  document.body.style.overflow='hidden';
  document.body.append(canvas);
  document.body.style.backgroundColor="#000000";
  //字符集问题
  let meta=document.createElement('meta');
  meta.setAttribute("charset",'utf-8');
  document.body.append(meta);
  launch(canvas);
  //不用modifyWindow
  //永远不响应改变窗口大小
}
window.addEventListener("DOMContentLoaded",start);