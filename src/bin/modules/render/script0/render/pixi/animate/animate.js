/**
 * {tween,update,time}
 */
import env from "../env";
import Tween from './tween'
let animatesId=0;
let animates=env.animates;
function createTickerAndSkiper(update,time,tweener,animateId){
  let x=0,dx=1/(time/1000*60);
  let thisAnimateId=animateId;
  function ticker(){
    x+=dx;
    if(x>=1)return skiper();
    update(tweener(x));
  }
  function skiper(){
    update(1);
    cancelAnimate(thisAnimateId);
  }
  return {ticker,skiper};
}
function createAnimate(update,time,tween,animateId){
  animateId=animateId||animatesId;
  let tweener=Tween.create(tween);
  let animateHandls=createTickerAndSkiper(update,time,tweener,animateId);
  env.app.ticker.add(animateHandls.ticker);
  animates.set(animateId,animateHandls);
  return animatesId++;
}
function cancelAnimate(handl){
  if(!animates.has(handl))return;
  let animate=animates.get(handl);
  env.app.ticker.remove(animate.ticker);
  animates.delete(handl);
}
function skipAnimate(handl){
  if(!animates.has(handl))return;
  let animate=animates.get(handl);
  animate.skiper();
}
function pauseAnimate(handl){
  if(!animates.has(handl))return;
  let animate=animates.get(handl);
  if(animate.paused)return;
  animate.paused=true;
  env.app.ticker.remove(animate.ticker);
}
function playAnimate(handl){
  if(!animates.has(handl))return;
  let animate=animates.get(handl);
  if(!animate.paused)return;
  animate.paused=false;
  env.app.ticker.add(animate.ticker);
}
function isEnded(handl){
  return !animates.has(handl);
}
export default{
  cancelAnimate,createAnimate,skipAnimate,pauseAnimate,playAnimate,isEnded
}