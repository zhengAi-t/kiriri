/**
 * 节流函数，保留最后一次的回调
 * @param {Number} spacing 最小间隔时间
 * 这段代码看起来不像是我写的qqq
 */
function throttle(spacing){
  spacing=spacing||5000;
  let defer=false,last=null;
  function throttler(callback){
    if(defer)return void(last=callback);
    defer=true;
    callback();
    let recover=()=>setTimeout(()=>last?(last(),last=null,recover()):(defer=false),spacing);
    recover();
  }
  return throttler;
}
export default{
  throttle
}