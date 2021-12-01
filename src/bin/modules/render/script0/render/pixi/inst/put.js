import env from '../env';
import config from './config';
import * as PIXI from 'pixi.js';
env.insts.put={};
env.insts.put.picture=function(inst,files){
  let app=env.app;
  let result=files.get(inst.file);
  let sprite=new PIXI.Sprite(result);
  let frame=env.windowInfo.getWindow();
  if(inst.rotate)sprite.rotation=inst.rotate;
  if(typeof inst.width==='number')sprite.width=frame.w*inst.width;
  if(typeof inst.height==='number')sprite.height=frame.h*inst.height;
  if(typeof inst.x==='number')sprite.x=frame.w*inst.x;
  if(typeof inst.y==='number')sprite.y=frame.h*inst.y;
  if(typeof inst.zindex==='number')sprite.zIndex=inst.zindex;
  if(typeof inst.alpha==='number')sprite.alpha=inst.alpha;
  if(typeof inst.mix==='string'){
    let mode=PIXI.BLEND_MODES[config.mixName[inst.mix.toUpperCase()]];
    sprite.blendMode=mode||0;
  }
  app.stage.addChild(sprite);
  let storeName=inst.id===undefined?'hide#iijds_9':inst.id;
  env.sprites.set(storeName,{sprite});
}
env.insts.put.text=function(inst){
  let sprite=new PIXI.Text(inst.text);
  let frame=env.windowInfo.getWindow();
  if(inst.rotate)sprite.rotation=inst.rotate;
  if(typeof inst.x==='number')sprite.x=frame.w*inst.x;
  if(typeof inst.y==='number')sprite.y=frame.h*inst.y;
  if(typeof inst.zindex==='number')sprite.zIndex=inst.zindex;
  if(typeof inst.alpha==='number')sprite.alpha=inst.alpha;
  if(typeof inst.mix==='string'){
    let mode=PIXI.BLEND_MODES[config.mixName[inst.mix.toUpperCase()]];
    sprite.blendMode=mode||0;
  }
  let style={};
  style.fill=inst.color||'white';
  if(typeof inst.fontSize==='number')style.fontSize=inst.fontSize*frame.h;
  if(typeof inst.width==='number'){
    style.wordWrap=true;
    style.wordWrapWidth=inst.width*frame.w;
    style.breakWords=true;
  }
  style=new PIXI.TextStyle(style);
  sprite.style=style;
  env.app.stage.addChild(sprite);
  let storeName=inst.id===undefined?'hide#iijds_9':inst.id;
  env.sprites.set(storeName,{sprite});
}
env.insts.put.video=async function(inst){
  //因为视频性能问题没有解决
  console.warn('unresolve');
  return false;
}
env.insts.put.shape=function(inst){
  let sprite=new PIXI.Graphics();
  let storeName=inst.id===undefined?'hide#iijds_9':inst.id;
  env.sprites.set(storeName,{sprite});
  env.app.stage.addChild(sprite);
  let frame=env.windowInfo.getWindow();
  if(inst.rotate)sprite.rotation=inst.rotate;
  if(typeof inst.zindex==='number')sprite.zIndex=inst.zindex;
  if(typeof inst.alpha==='number')sprite.alpha=inst.alpha;
  if(typeof inst.mix==='string'){
    let mode=PIXI.BLEND_MODES[config.mixName[inst.mix.toUpperCase()]];
    sprite.blendMode=mode||0;
  }
  inst.color=inst.color||'#000000';
  inst.color=Number('0x'+inst.color.slice(1));
  if(typeof inst.alpha!=='number')inst.alpha=1;
  if(typeof inst.width==='number')sprite.width=frame.w*inst.width;
  if(typeof inst.height==='number')sprite.height=frame.h*inst.height;
  if(typeof inst.x==='number')sprite.x=frame.w*inst.x;
  if(typeof inst.y==='number')sprite.y=frame.h*inst.y;
  sprite.beginFill(inst.color,1);
  //代码太长
  shapesInst[config.shapes[inst.shapeType]||'rectangle'](inst,sprite,frame);
  sprite.endFill();
}
let shapesInst={};
//矩形包括圆角矩形
/**
 * 
 * @param {*} inst 
 * @param {PIXI.Graphics} sprite 
 * @param {*} frame 
 */
shapesInst['rectangle']=function(inst,sprite,frame){
  let width=typeof inst.width==='number'?inst.width*frame.w:frame.w;
  let height=typeof inst.height==='number'?inst.height*frame.h:frame.h;
  if(typeof inst.radus!=='number')return sprite.drawRect(0,0,width,height);
  sprite.drawRoundedRect(0,0,width,height,inst.radus*frame.h/2);
}
/**
 * 
 * @param {*} inst 
 * @param {PIXI.Graphics} sprite 
 * @param {*} frame 
 */
shapesInst['circle']=function(inst,sprite,frame){
  sprite.drawCircle(sprite.x+sprite.width/2,sprite.y+sprite.height/2,typeof inst.radus==="number"?inst.radus*frame.h/2:frame.h/2);
}
/**
 * 
 * @param {*} inst 
 * @param {PIXI.Graphics} sprite 
 * @param {*} frame 
 */
shapesInst['ellipse']=function(inst,sprite,frame){
  let width=typeof inst.width==='number'?width*frame.w:frame.w;
  let height=typeof inst.height==='number'?height*frame.h:frame.h;
  sprite.drawEllipse(sprite.x+sprite.width/2,sprite.y+sprite.height/2,width,height);
}