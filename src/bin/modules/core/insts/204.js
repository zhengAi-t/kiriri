import env from '../env';
import Copy from '../../../lib/deepCopy';
/**
* 204 载入剧情块
*/
env.instCollect['204']=function (inst){
  if(!inst.data.filename)inst.data.filename=env.stack[env.stack.length-1].filename;
  env.cache.get(inst.data.filename).then(script=>{
    let thisTop=Copy.deepCopy(inst.data);
    let name=inst.data.name;
    thisTop.content=name?script.blocks[name]:script.main; 
    thisTop.index=0;
    env.stack.push(thisTop);
    env.process();
  });
  return false;
}