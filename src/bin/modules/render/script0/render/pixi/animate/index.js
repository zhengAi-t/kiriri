import Animate from './animate';
import env from '../env';
env.Animate=Animate;
//直接实现动画指令的执行
//{{update,time,tween}}
function createAnimate(inst){
  //获得需要进行动画的一些属性
  //{[name]:{from,to}}
  let attrs=getAnimateAttrs(inst);
  //获得精灵
  let sprite=env.sprites.get(inst.id).sprite;
  //创建更新函数
  let update=createUpdater(attrs,sprite);
  let animateHandl=Animate.createAnimate(update,inst.ease||300,{name:inst.tween},inst.animateId);
  //处理动画冲突的问题，同一个id的同一个属性已经有了动画，则前一个skip
  handlConflict(inst.id,Object.keys(attrs),animateHandl);
}
let cancelAnimate=Animate.cancelAnimate;
let skipAnimate=Animate.skipAnimate;
let pauseAnimate=Animate.pauseAnimate;
let playAnimate=Animate.playAnimate;
let isEnded=Animate.isEnded;
//{[name]:{from,to}}
function getAnimateAttrs(inst){
  let path=[];
  let result={};
  function visit(top){
    if(typeof top!=='object')return;
    if(typeof top.from==='number'&&top.from<Infinity
      &&typeof top.to==='number'&&top.to<Infinity){
      result[path.join('.')]={from:top.from,to:top.to};
    }
    let keys=Object.keys(top);
    for(let key of keys){
      path.push(key);
      visit(top[key]);
      path.pop();
    }
  }
  visit(inst);
  return result;
}
let updates_={};
updates_.x=(sprite,x,info)=>sprite.x=x*info.w;
updates_.y=(sprite,x,info)=>sprite.y=x*info.h;
updates_.width=(sprite,x,info)=>sprite.width=x*info.w;
updates_.height=(sprite,x,info)=>sprite.height=x*info.h;
updates_.rotate=(sprite,x)=>sprite.rotation=x;
updates_.alpha=(sprite,x)=>sprite.alpha=x;
let updates={};
for(let i in updates_){
  updates[i]=function(sprite,from,to){
    let info=env.windowInfo.getWindow();
    return (x)=>updates_[i](sprite,from+(to-from)*x,info);
  }
}
//{[name]:{from,to}}
function createUpdater(attrs,sprite){
  let theUpdates=[];
  for(let i in attrs){
    let theUpdate=updates[i](sprite,attrs[i].from,attrs[i].to);
    theUpdates.push(theUpdate);
  }
  return (x)=>theUpdates.forEach(s=>s(x));
}
//需要冲突指令取消的功能
let animates=new Map;
//处理可能出现的动画冲突
function handlConflict(spriteId,attrs,animateHandl){
  if(!animates.has(spriteId)) animates.set(spriteId,new Map);
  attrs.sort();
  //{attrs:[],animateHandl}[]
  /**
   * @type {Map<number,string[]>}
   */
  let theAnimates=animates.get(spriteId);
  theAnimates.forEach(handl);
  function handl(oldAttrs,oldAnimateHandl,theMap){
    if(Animate.isEnded(oldAnimateHandl))return theMap.delete(oldAnimateHandl);
    if(!isConflict(attrs,oldAttrs))return;
    console.warn('animate conflict');
    theMap.delete(oldAnimateHandl);
    Animate.skipAnimate(oldAnimateHandl);
  }
  theAnimates.set(animateHandl,attrs);
}
//如果属性有重合,冲突状态
function isConflict(a,b){
  let indexa=0,indexb=0,lengtha=a.length,lengthb=b.length;
  while(indexa<lengtha&&indexb<lengthb){
    if(a[indexa]===b[indexb])return true;
    if(a[indexa]<b[indexb])indexa++;
    else indexb++;
  }
  return false;
}
export default{
  cancelAnimate,createAnimate,skipAnimate,pauseAnimate,playAnimate,isEnded
}