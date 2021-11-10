/**
 * 通过script0来实现的声音系统
 * 功能
 * 播放声音
 * cv播放的时候，背景音乐声音变小
 * 声音的淡入和淡出
 */
/**
 * 故事脚本没有直接定义声音演出脚本
 * 声音演出脚本的定义依赖于环境对于声音处理的支持
 * 和声音模块具体的结构设计，所以无法定义统一的接口
 */
import Event from '../../../lib/eventsys';
import cache from './cache/index';
let event=Event.EventSys();
let players={bgm:new Audio,cv:new Audio,se:new Map};
function ease(audio,time,volume,callback){
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
let types={bgm:{},se:{},cv:{}};
types.bgm.replace=async function(inst){
  let url=(await cache.get(inst.file)).url;
  let audio=players.bgm;
  if(!audio.paused)ease(audio,100,0,apply);
  else apply();
  function apply(){
    audio.loop=!!inst.loop;
    audio.src=url;
    ease(audio,inst.ease>=100?inst.ease:100,inst.volume||1);
    audio.play();
  }
}
types.bgm.set=function (inst){
  if(typeof inst!=='number')inst.volume=1
  ease(players.bgm,inst.ease>=100?inst.ease:100,inst.volume);
}
types.bgm.pause=function(inst){
  ease(players.bgm,inst.ease>=100?inst.ease:100,0,()=>{
    players.bgm.pause();
  });
}
types.bgm.resume=function(inst){
  players.bgm.volume=0;
  players.bgm.play();
  ease(players.bgm,inst.ease>=100?inst.ease:100,inst.volume||1);
}
types.cv.replace=async function(inst){
  let url=(await cache.get(inst.file)).url;
  let audio=players.cv;
  if(!audio.paused)ease(audio,100,0,apply);
  else apply();
  function apply(){
    audio.src=url;
    audio.volume=inst.volume||1;
    audio.play();
  }
}
types.cv.skip=function(){
  ease(players.cv,100,0,()=>{
    players.bgm.pause();
  });
}
types.se.add=async function(inst){
  let url=(await cache.get(inst.file)).url;
  let audio=new Audio;
  audio.loop=!!inst.loop;
  players.se.set(inst.id,audio);
  audio.src=url;
  audio.play();
  ease(audio,inst.ease>=200?inst.ease:200,inst.volume||1);
  audio.onpause=()=>players.se.delete(inst.id);
}
types.se.remove=function(inst){
  let audio=players.se.get(inst.id);
  if(!audio)return;
  ease(audio,inst.ease>=100?inst.ease:100,0,()=>{
    audio.pause();
    players.se.delete(inst.id);
  });
}
types.se.set=function(inst){
  let audio=players.se.get(inst.id);
  if(!audio)return;
  ease(audio,inst.ease>=100?inst.ease:100,inst.volume||0);
}
types.se.pause=function(inst){
  let audio=players.se.get(inst.id);
  if(!audio)return;
  ease(audio,inst.ease>=100?inst.ease:100,0,()=>{
    audio.onpause=null;
    audio.pause();
  });
}
types.se.resume=function(inst){
  let audio=players.se.get(inst.id);
  if(!audio)return;
  audio.volume=0;
  audio.play();
  audio.onpause=()=>players.se.delete(inst.id);
  ease(audio,inst.ease>=100?inst.ease:100,inst.volume||1);
}
function exector(content){
  for(let i in content){
    let inst=content[i];
    setTimeout(()=>{
      types[inst.type][inst.opt](inst);
    },inst.delay||0);
  }  
}
export default{
  exector,event
}