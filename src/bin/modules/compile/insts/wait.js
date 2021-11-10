import env from "../env";
env.parses2.set("wait",parseWait);
function parseWait(content){
  env.ignoreSpace();
  let time=env.getTime();
  content.push({type:501,data:{time}});
}
env.getTime=function(){
  let num=env.getNumber();
  env.ignoreSpace();
  let match=env.code.slice(env.index).match(/^[ms]+/);
  if(!match)return num;
  if(match[0]==='s')num=num*1000,env.index++;
  else if(match[0]==='ms')env.index+=2;
  else console.error('keyword may error');
  return num;
}