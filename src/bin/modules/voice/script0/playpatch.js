/**
 * 解决用户没有手势动作没有权限不能播放的bug
 */
let play=HTMLAudioElement.prototype.play;
HTMLAudioElement.prototype.play=function(){
  play.call(this).catch(()=>getGesture(()=>play.call(this)));
}
function getGesture(playCallback){
  let evntNames=["touchend","click","doubleclick","keydown"];
  let callback=()=>{
    evntNames.forEach(s=>window.removeEventListener(s,callback));
    playCallback();
    HTMLAudioElement.prototype.play=play;
  }
  evntNames.forEach(s=>window.addEventListener(s,callback));
}