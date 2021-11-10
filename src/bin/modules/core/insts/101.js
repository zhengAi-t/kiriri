import env from '../env';
/**
 * 101普通对话
 */
env.instCollect['101']=requestDialog;
function requestDialog(inst){
  env.requestUI('Dialog','show',inst.data);
}
//请求组件
env.requestUI=function(uiName,opt,config){
  env.event.emit('requestUI',uiName,opt,config);
  env.event.once("requestUIReturn",handlUIReturn);
  return false;
}
let handlUIReturn=(config)=>{
  config=config||{};
  let stack=env.stack;
  let top=stack[stack.length-1];
  if(config.offset&&(typeof config.offset!=='number'
    ||!(config.offset<Infinity&&config.offset>-Infinity)))console.error('offset error');
  if(config.offset)top.index+=config.offset;
  env.process();
}