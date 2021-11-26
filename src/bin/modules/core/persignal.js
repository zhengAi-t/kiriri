/**
 * 这里是关于预加载的补丁，所以当工程模块改变的时候，或者在一些情况下，这种方式是无法预加载的
 * 这个补丁很容易发生改变
 */
import env from './env';
let lastIndex,currentFile,currentName,endIndex=0;
function signal(index){
  let top=env.stack[env.stack.length-1];
  let content=top.content;
  let file=top.filename,name=top.name;
  let insts={voice:[],render:[]};
  let count=0;
  if(currentFile!==file||currentName!==name){
    lastIndex=index+1,endIndex=index;
    currentFile=file,currentName=name,count=15;
  }else{
    for(let i=lastIndex;i<=index;i++){
      let type=content[i].type;
      if(type>=300&&type<400)count++;
    }
  }
  lastIndex=index;
  for(let i=endIndex,l=content.length;i<l&&count>0;i++){
    let type=content[i].type;
    if(type<300||type>=400)continue;
    let item={code:content[i].data.code,index:i};
    type===301?insts.voice.push(item):insts.render.push(item);
    count--;
    endIndex=i+1;
  }
  if(insts.voice.length)env.event.emit("prepareVoice",insts.voice);
  if(insts.render.length)env.event.emit("prepareRender",insts.render);
}
export default{
  signal
}