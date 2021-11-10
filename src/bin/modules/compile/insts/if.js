import env from '../env';
env.parses2.set('if',parseIf);
function parseIf(content){
  let skips=[];
  let ifInst={type:203,data:{tag:[]}};
  env.ignoreSpace();
  let tag=env.getExpression();
  ifInst.data.tag=tag;
  env.ignoreBlank();
  env.index++;
  content.push(ifInst);
  let beforeIf=content.length;
  env.compileBlock(content);
  let ifEnd={type:203,data:{tag:{left:['0'],sign:'==',right:['1']}}};
  content.push(ifEnd);
  skips.push({base:content.length,inst:ifEnd});
  ifInst.data.offset=content.length-beforeIf;
  //若干个elseif
  let rollback=env.index;
  while(1){
    env.ignoreBlank();
    if(env.code[env.index]!=='#')break;
    env.index++;
    let keyword=env.getKeyword();
    if(keyword!=='elseif')break;
    env.ignoreSpace();
    let tag=env.getExpression();
    env.ignoreBlank();
    env.index++;
    let toNext={type:203,data:{tag:tag}};
    content.push(toNext);
    let beforeThis=content.length;
    env.compileBlock(content);
    let skip={type:203,data:{tag:{left:['0'],sign:'==',right:['1']}}};
    content.push(skip);
    skips.push({base:content.length,inst:skip});
    toNext.data.offset=content.length-beforeThis;
    rollback=env.index;
  }
  env.index=rollback;
  //可能的else
  env.ignoreBlank();
  rollback=env.index;
  if(env.code[env.index]==='#'){
    env.index++;
    let keyword=env.getKeyword();
    if(keyword==='else'){
      env.ignoreBlank();
      env.index++;
      env.compileBlock(content);
      rollback=env.index;
    }
  }
  env.index=rollback;
  //收尾工作
  for(let i=0;i<skips.length;i++){
    skips[i].inst.data.offset=content.length-skips[i].base;
  }
}