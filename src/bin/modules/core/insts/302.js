import env from '../env';

env.instCollect['302']=function (inst){
  env.event.emit("requestRender",inst.data.code||'');
  return true;
}