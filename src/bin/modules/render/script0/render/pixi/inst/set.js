import env from '../env';
import config from './config';
env.insts.set={};
env.insts.set.default=function(inst){
  let item=env.sprites.get(inst.id);
  let sprite=item.sprite;
  let frame=env.windowInfo.getWindow();
  let checkAttr=attr=>attr&&typeof attr.from!=='number';
  if(checkAttr(inst.rotate))sprite.rotation=inst.rotate.to;
  if(checkAttr(inst.width))sprite.width=frame.w*inst.width.to;
  if(checkAttr(inst.height))sprite.height=frame.h*inst.height.to;
  if(checkAttr(inst.x))sprite.x=frame.w*inst.x.to;
  if(checkAttr(inst.y))sprite.y=frame.h*inst.y.to;
  if(typeof inst.zindex==='number')sprite.zIndex=inst.zindex;
  if(checkAttr(inst.alpha))sprite.alpha=inst.alpha.to;
  if(inst.color)sprite.style.fill=inst.color;
  if(typeof inst.text!=='undefined')sprite.text=String(inst.text);
  if(typeof inst.mix==='string'){
    let mode=env.PIXI.BLEND_MODES[config.mixName[inst.mix.toUpperCase()]];
    sprite.blendMode=mode||0;
  }
  if(typeof inst.mask!=='undefined'&&env.sprites.has(inst.mask)){
    let mask=env.sprites.get(inst.mask).sprite;
    mask.alpha=1;
    sprite.mask=mask;
  }
  if(typeof inst.ease!=='number'||!(inst.ease>0))return;
  let animateHandl=env.Animate.createAnimate(inst);
  if(!item.animate)item.animate=new Set;
  item.animate.add(animateHandl);
}