/**
 * 这个模块用来描述如何处理预加载的请求
 */
let queue=[];
let isworking=false;//是否正在运行准备程序
import cache from "./cache";
function work(){
  isworking=true;
  while(queue.length&&!queue[0].inxt.file)queue.shift();
  if(!queue.length)return void(isworking=false);
  let file=queue.shift().inst.file;
  cache.get(file).then(work).catch(()=>console.error('file get error'));
}
import compile from "../../compile";
function prepareCode(content){
  let start=content[0].index;
  if(queue.length&&queue[queue.length-1].index<start)queue.splice(0,Infinity);
  queue.splice(0,0,[].concat(...content.map(s=>{
    let content=compile.compile(s.code);
    return content.map(i=>({inst:i,index:s.index}));
  })));
  if(!isworking)work();
}
export default{
  prepareCode
}