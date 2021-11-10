import env from '../env';
env.parses2.set('load',parseLoad);
function parseLoad(content){
  let inst={data:{}};
  env.index++;
  inst.type=204;
  env.ignoreSpace();
  let string0=env.getString();
  env.ignoreSpace();
  let string1=env.getString();
  content.push(inst);
  if(string1){
    inst.data.filename=string0;
    inst.data.name=string1;
    return;
  }
  //这里只提供了一个参数,但是为了简便需要提供两个功能
  //省略的是main这个默认的模块名称
  //省略的是当前文件的文件名，所以蓄意判断给定的字段是
  //模块名还是文件名，为了保持一致，无法判断默认认为是文件名
  if(isFilename(string0))inst.data.filename=string0;
  else inst.data.name=string0;
}
function isFilename(string){
  //如果不含有‘/’，‘\’,或者后缀名的,判定为模块名
  console.warn('only one para ,auto detected');
  let tag1=!!string.match(/[/\\]/);
  let tag2=string.match(/\.\w+$/);
  let tag3=string.match(/^\w+$/);
  //filename为true，name为false
  return (tag1||tag2)&&!tag3;
}