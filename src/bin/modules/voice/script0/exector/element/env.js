let env={};
import cache from './cache';
env.cache=cache;
//修复没有和页面交互不能播放声音的补丁
import './playpatch';
env.players={bgm:new Audio,cv:new Audio,se:new Map};
env.ease=function ease(audio,time,volume,callback){
  callback=callback||(()=>0);
  if(volume>1)volume=1;
  else if(volume<0)volume=0;
  if(audio.volume===volume)return;
  let x=audio.volume;
  let dx=(volume-x)/(60*time/1000)
  if(audio.onEase)return;
  audio.onEase=1;
  function Step(){
    x+=dx;
    if(x>=volume){
      audio.onEase=0;
      audio.volume=volume;
      callback();
    }else{
      audio.volume=x;
      requestAnimationFrame(Step);
    }
  }
  Step();
}
env.types={bgm:{},se:{},cv:{}};
export default env;