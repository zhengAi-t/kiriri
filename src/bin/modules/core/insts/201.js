import env from '../env';
/**
* 201 设定周目内数值
*/
env.instCollect['201']=function (inst){
  let value=env.computeRightvalue(inst.data.value);
  env.values[inst.data.name]=value;
  return true;
}
//对表达式进行求值
env.computeRightvalue=function(rightvalue){
  let result=0;
  let sign=1;
  for(let i=0,l=rightvalue.length;i<l;i++){
    let token=rightvalue[i];
    if(token==='+')sign=1;
    else if(token==='-')sign=-1;
    else result+=sign*env.getValue(token);
  }
  return result;
}
/**
 * 对名称进行求值
 */
env.getValue=function(name){
  let testNum=Number(name);
  if(testNum<Infinity)return testNum;
  let result=env.values[name];
  if(typeof result!=='undefined')return result;
  result=env.record.name;
  if(typeof result!=='number'||!(result<Infinity))console.warn('getvalue =',String(result));
  return result;
}