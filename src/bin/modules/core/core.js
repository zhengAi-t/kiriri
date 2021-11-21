/**
 * 控制流程
 */
import env from './env';
import './insts/index';
export let init=config=>env.record=config.record;
import microTask from '../../lib/microTask';
/**
 * 根据环境运行脚本
 * stack[] {filename,name,content,index}
 */
env.process=function(){
  if(env.isRunning)return console.error('start twice');
  env.isRunning=true;
  //防止事件顺序出错
  microTask.microTask(()=>{
    let top=env.stack[env.stack.length-1];
    let content=top.content;
    let length=content.length;
    while(top.index<length){
      let inst=content[top.index++];
      if(env.execInst(inst))continue;
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
function loadSnapshot(snapshot){
  env.values=Copy.deepCopy(snapshot.values);
  env.event.clear();
  let stack=snapshot.stack;
  env.stack=[];
  let length=stack.length;
  function pushScript(index){
    if(index>=length)return process();
    env.event.emit("requestScript",stack[index]);
    env.event.once("requestScriptReturn",content=>{
      let stackInfo=Copy.deepCopy(stack[index]);
      stackInfo.content=content;
      env.stack.push(stackInfo);
      pushScript(index+1);
    });
  }
  pushScript(0);
}
/**
 * 长臂干涉状态
 * 暂时未实现
 */
function hand(config){
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
export default{
  event:env.event,//事件交流
  loadScript,
  loadSnapshot,
  pushScript,
  takeSnapshot,
  goOn:env.process,
  hand
}
