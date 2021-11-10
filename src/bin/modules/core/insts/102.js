import env from '../env';
/**
 * 102 选项
 */
env.instCollect['102']=requestChoice;
function requestChoice(inst){
  env.requestUI("Choice",'show',inst.data);
  return false;
}