import env from '../env';
let hand={};
/**
 * 功能是直接执行函数
 */
hand.default=function(inst){
  let code=`return function (env){\n${inst.code};}`;
  Function(code)()(env);
}
export default hand;