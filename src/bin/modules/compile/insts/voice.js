import env from "../env";
env.parses2.set("voice",parseVoice);
function parseVoice(content){
  env.ignoreBlank();
  if(env.code[env.index]==='{')parseVoiceMultiply(content);
  else parseVoiceSingal(content);
}
function parseVoiceMultiply(content){
  let stack=0,start=env.index+1;
  while(env.index<env.length){
    if(env.code[env.index]==='{')stack++;
    else if(env.code[env.index]==='}')stack--;
    if(env.code[env.index]==='\\')env.index++;
    if(stack<=0)break;
    env.index++;
  }
  let inst={type:301,data:{code:env.code.slice(start,env.index)}};
  env.index++;
  content.push(inst);
}
function parseVoiceSingal(content){
  env.ignoreSpace();
  let result=[];
  let inString=false;
  while(env.index<env.length){
    let char=env.code[env.index];
    if(char==='\\'){
      result.push(char);
      result.push(env.code[++env.index]);
      env.index++;
      continue;
    }
    if(char==='\''||char==='\"')inString=!inString;
    else if(!inString&&char===';')break;
    result.push(char);
    env.index++;
  }
  env.index++;
  content.push({type:301,data:{code:result.join('')}});
}