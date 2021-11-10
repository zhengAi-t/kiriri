import env from '../env';
env.parses1.set('[',parseDialog);
env.parses1.set('default',parseDialog);
function parseDialog(content){
  let inst={data:{}};
  if(env.code[env.index]==='['){
    inst.type=101;
    let name=env.getName();
    inst.data.name=name;
    env.ignoreSpace();
    let text=env.getText();
    inst.data.text=text;
  }else{
    //xxxx
    inst.type=101;
    let text=env.getText();
    inst.data.text=text;
  }
  if(!inst.data.text||inst.data.text.match(/[#\{\}\;\[\]]/))console.warn('compile may error');
  content.push(inst);
}
/**
 * 人物名称的获取规则
 */
env.getName=function(){
  let result=[];
  if(env.code[env.index]!=='[')return;
  env.index++;
  while(env.index<env.length){
    if(env.code[env.index]==='\\')env.index++;
    if(env.code[env.index]===']')break;
    result.push(env.code[env.index]);
    env.index++;
  }
  env.index++;
  return result.join('');
}
/**
 * 获得剧情文本
 */
env.getText=function(){
  let line=env.code.slice(env.index);
  let match=line.match(/^[^\r\n]+/);
  if(match)env.index+=match[0].length;
  else console.error('compile error');
  return match?match[0]:'';
}