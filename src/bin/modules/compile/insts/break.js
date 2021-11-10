import env from "../env";
env.parses2.set('break',parseBreak);
function parseBreak(content){
  let inst={type:401,data:{paras:[]}};
  content.push(inst);
  while(env.index<env.length){
    env.ignoreSpace();
    let char=env.code[env.index];
    if(char===';')break;
    if(char==='\''||char==='\"')inst.data.paras.push(env.getString());
    else if(!char.match(/[\r\n\s]/)){
      let text=env.getAnyText();
      let testNum=Number(text);
      inst.data.paras.push(testNum<Infinity?testNum:text);
    }else break;
  }
  env.ignoreSpace();
  if(env.code[env.index]===';')env.index++;
  env.ignoreBlank();
}
env.getAnyText=function(){
  let result=env.code.slice(env.index).match(/^[^\r\n\s;]+/);
  if(!result)return;
  env.index+=result[0].length;
  return result[0];
}