/**
 * 这个模块用来描述如何处理预加载的请求
 */
let queue=[];
let isworking=false;//是否正在运行准备程序
import config from './config';
function work(){
  isworking=true;
  while(queue.length&&!queue[0].inst.file)queue.shift();
  if(!queue.length)return void(isworking=false);
  let file=queue.shift().inst.file;
  config.render.get(file).then(work).catch(()=>console.error('file.get error'));
}
import compile from "../compile";
function prepareCode(content,index){
  while(queue.length&&queue[0].index<=index)queue.shift();
  queue.splice(queue.length,0,...[].concat(...content.map(s=>{
    let content=compile.compile(s.code);
    return content.map(i=>({inst:i,index:s.index}));
  })));
  if(!isworking)work();
}
export default{
  prepareCode
}