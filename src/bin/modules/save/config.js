import values from './values';
import method from './method';

let save=(async function(){
  let save={};
  
  //选择启用哪些存储方式
  save.values=await values;
  save.raw=method.indexeddb||method.filesystem||method.localstorage;

  return save;
})();
export default save;