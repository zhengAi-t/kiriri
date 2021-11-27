/**
 * 默认的渲染模块
 * postCode,event
 */
import compile from './compile';
import render from './render';
function postCode(code){
  let content=compile.compile(code);
  render.exector(content);
}
export default{
  postCode,
  event:render.event,
  getWindow:render.getWindow,
  prepareCode:render.prepareCode
}