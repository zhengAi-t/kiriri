/**
 * 防抖函数，
 * 对于高频率触发的某个函数，但是又不需要每次都执行，
 * 这个时候建议加上防抖，延迟执行，只保留最后一次的函数调用
 */
function debounce(spacing){
  let last=null;
  return function(callback){
    clearTimeout(last);
    last=setTimeout(callback,spacing);
  }
}
export default{
  debounce
}