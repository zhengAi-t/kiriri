/**
 * 这里是预加载模块
 * 当指令需要一个消耗时间的内存对象时，
 * 这个模块的存在帮助在需要时更快的建立
 */
let queue=[];
let isworking=false;//是否正在运行准备程序
import cache from "./cache";
function work(){
  isworking=true;
  while(queue.length&&!queue[0].inst.file)queue.shift();
  if(!queue.length)return void(isworking=false);
  let file=queue.shift().inst.file;
  cache.get(file).then(work).catch(()=>console.error('file get error'));
}
import compile from "./compile";
function prepareCode(content,index){
  while(queue.length&&queue[0].index<=index)queue.shift();
  queue.splice(queue.length,0,...[].concat(...content.map(s=>{
    let content=compile.parseCode(s.code);
    return content.map(i=>({inst:i,index:s.index}));
  })));
  if(!isworking)work();
}
export default{
  prepareCode
}