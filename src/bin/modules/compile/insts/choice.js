import env from '../env';
env.parses2.set("choice",parseChoice);
function parseChoice(content){
  let inst={type:102,data:{choice:[]}};
  let skips=[];
  content.push(inst);
  //102
  //203
  env.ignoreSpace();
  let choices=[];
  let chName;
  while((chName=env.getString())){
    choices.push({name:chName});
    env.ignoreSpace();
  }
  inst.data.choice=choices;
  let base=content.length;
  let maxCount=choices.length;
  let rollback=env.index;
  while(maxCount--){
    env.ignoreBlank();
    if(env.code[env.index]!=='#')break;
    env.index++;
    let keyword=env.getKeyword();
    if(keyword!=='ch')break;
    let idx=env.getNumber();
    env.ignoreBlank();
    env.index++;//去掉{
    inst.data.choice[idx-1].offset=content.length-base;
    env.compileBlock(content);
    content.push({type:203,data:{tag:{left:['0'],sign:'==',right:['1']}}});
    skips.push({
      inst:content[content.length-1],
      base:content.length
    });
    rollback=env.index;
  }
  env.index=rollback;
  for(let i=0;i<skips.length;i++){
    let inst=skips[i].inst;
    inst.data.offset=content.length-skips[i].base;
  }
}