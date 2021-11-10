import env from '../env';
/**
* 203 不符合条件跳转
*/
env.instCollect['203']=function (inst){
  if(!env.computeExpression(inst.data.tag)){
    let top=env.stack[env.stack.length-1];
    top.index+=inst.data.offset;
  }
  return true;
}
let signs={};
signs['>']=(a,b)=>a>b;
signs['<']=(a,b)=>a<b;
signs['>=']=(a,b)=>a>=b;
signs['<=']=(a,b)=>a<=b;
signs['=']=(a,b)=>a===b;
signs['==']=(a,b)=>a===b;
signs['===']=(a,b)=>a===b;
signs['!=']=(a,b)=>a!==b;
signs['!==']=(a,b)=>a!==b;
signs['<>']=(a,b)=>a!==b;
//计算比较表达式
env.computeExpression=function(expression){
  let left=env.computeRightvalue(expression.left);
  let right=env.computeRightvalue(expression.right);
  let sign=expression.sign;
  return signs[sign](left,right);
}