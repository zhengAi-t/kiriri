import env from '../env';

env.instCollect['301']=function (inst){
  env.event.emit("requestVoice",inst.data.code||'');
  return true;
}