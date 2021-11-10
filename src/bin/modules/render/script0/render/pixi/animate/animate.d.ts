type AnimateHandl=number;
interface TweenCfg{
  //补间函数的名字
  name:string;
  //和补间函数相关的其他参数可以扩展
}
interface Animate{
  createAnimate(update:(x:number)=>void,time:number,tween:TweenCfg,animateId:any):AnimateHandl;
  skipAnimate(handl:AnimateHandl):void;
  cancelAnimate(handl:AnimateHandl):void;
  pauseAnimate(handl:AnimateHandl):void;
  playAnimate(handl:AnimateHandl):void;
  isEnded(handl:AnimateHandl):boolean;
}
declare var module:Animate;
export default module;