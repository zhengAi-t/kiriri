/**
 * 默认的渲染模块
 * postCode,event
 */
import {compile} from './compile/index';
import render from './render/index';
function postCode(code){
  let content=compile(code);
  render.exector(content);
}
export default{
  postCode,event:render.event,getWindow:render.getWindow
}