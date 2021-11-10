interface AnimateSpace{
  from:number;
  to:number;
  [propName:string]:AnimateSpace|any;
}
interface Inst{
  [propName:string]:AnimateSpace|any;
}
type AnimateHandl=number;
interface Animate{
  createAnimate(inst:Inst):AnimateHandl;
  skipAnimate(handl:AnimateHandl):void;
  cancelAnimate(handl:AnimateHandl):void;
  pauseAnimate(handl:AnimateHandl):void;
  playAnimate(handl:AnimateHandl):void;
  isEnded(handl:AnimateHandl):boolean;
}
declare var module:Animate;
export default module;