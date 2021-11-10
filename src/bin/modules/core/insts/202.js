import env from '../env';
/**
* 202设定周目数值
*/
env.instCollect['202']=function (inst){
  let value=env.computeRightvalue(inst.data.value);
  env.record[inst.data.name]=value;
  return true;
}