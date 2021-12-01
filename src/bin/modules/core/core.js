/**
 * 控制流程
 */
import env from './env';
import './insts';
import preSignal from './persignal';
import './cache';
export let init=config=>env.record=config.record;
import microTask from '../../lib/microTask';
/**
 * 根据环境运行脚本
 * stack[] {filename,name,content,index}
 */
env.process=function(){
  //防止事件顺序出错
  microTask.microTask(()=>{
    if(env.isRunning)return console.error('start twice');
    env.isRunning=true;
    if(env.locked>0)return;
    let top=env.stack[env.stack.length-1];
    let content=top.content;
    let length=content.length;
    while(top.index<length){
      let inst=content[top.index++];
      if(env.execInst(inst))continue;
      preSignal.signal(top.index-1);
      env.isRunning=false;
      return;
    }
    env.stack.pop();
    env.event.emit("ScriptEnd",top.filename,top.name);
    env.isRunning=false;
    if(env.stack.length)env.process();
  });
}
/**
 * 载入脚本，
 * 覆盖当前执行状态
 * script:{filename,name,content}
 */
function loadScript(script){
  env.event.clear();
  env.stack=[{
    filename:script.filename,
    name:script.name,
    content:script.content,
    index:0
  }];
  env.values={};
  process();
}
/**
 * 推入脚本
 * 挂起当前脚本，并在当前环境执行新脚本
 */
function pushScript(script){
  env.stack.push({
    filename:script.filename,
    name:script.name,
    content:script.content,
    index:0
  });
  env.process();
}
import Copy from '../../lib/deepCopy';
/**
 * 获取当前状态快照
 * values
 * stack [filename,name,index]
 */
function takeSnapshot(){
  let values=Copy.deepCopy(env.values);
  let stack=env.stack.map((s)=>{
    return {
      filename:s.filename,
      name:s.name,
      index:s.index
    }
  });
  return {values,stack};
}
/**
 * 恢复快照状态
 * stack [filename,name,index]
 * values
 */
async function loadSnapshot(snapshot){
  env.values=Copy.deepCopy(snapshot.values);
  env.event.clear();
  let stack=snapshot.stack;
  env.stack=[];
  for(let i=0,l=stack.length;i<l;i++){
    let theStack=stack[i];
    let script=await env.cache.get(theStack.filename);
    let stackInfo=Copy.deepCopy(theStack);
    stackInfo.content=theStack.name?script.blocks[theStack.name]:script.main;
    env.stack.push(stackInfo);
  }
}
/**
 * 核心锁定,
 * 核心锁定之后，不会继续往后运行，
 * 这个时间调用goon也是不会继续运行的
 */
function lock(){
  if(env.locked>0)return void(env.locked++);
  env.locked=1;
  env.event.emit('locked');
}
/**
 * 核心解锁，
 * 如果在锁定期间请求过继续运行，将会在解锁的之后运行
 */
function unlock(){
  if(!(env.locked>0))return void(console.error('unlock error'));
  env.locked--;
  if(env.locked>0)return;
  env.event.emit('unlocked');
  if(!env.isRunning)return;
  env.isRunning=false;
  env.process();
}
/**
 * 长臂干涉状态
 * 暂时未实现
 */
function hand(config){
  console.error('未实现')
  return false;
}
/*------------------------------------------------------*/
/**
* 返回false中断
*/
env.execInst=function(inst){
  let exector=env.instCollect[inst.type]||execDefault;
  return exector(inst);
}
/**
 * 默认的指令执行函数，为了保持兼容性和控制台报错处理
 */
function execDefault(inst){
  console.error('未实现');
  return true;
}
export default{
  event:env.event,//事件交流
  loadScript,
  loadSnapshot,
  pushScript,
  takeSnapshot,
  goOn:env.process,
  lock,
  unlock,
  hand
}
