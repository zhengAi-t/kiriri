/**
 * 这里提供随机化的各种工具函数
 */
let chars='qwertyuiopasdfghjklzxcvbnm0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
function string(length){
  length=length||32;
  let result=[];
  while(length--) result.push(chars[Math.floor(Math.random()*62)]);
  return result.join('');
}
export default{
  string
}