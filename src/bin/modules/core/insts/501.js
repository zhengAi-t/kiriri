import env from "../env";
//返回false代表中断
env.instCollect['501']=function(inst){
  let time=inst.data.time||300;
  setTimeout(env.process,time);
  return false;
}