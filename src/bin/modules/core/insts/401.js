import env from '../env';

env.instCollect['401']=function (inst){
  env.event.emit("requestExtension",inst.data.paras);
  return false;
}