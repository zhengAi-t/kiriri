import env from '../env';
env.insts.hand={};
/**
 * 功能是直接执行函数
 */
env.insts.hand.default=function(inst){
  let code=`return function (env){\n${inst.code};}`;
  Function(code)()(env);
}