import env from '../env';
env.types.se.resume=function(inst){
  let audio=env.players.se.get(inst.id);
  if(!audio)return;
  audio.volume=0;
  audio.play();
  audio.onpause=()=>env.players.se.delete(inst.id);
  env.ease(audio,inst.ease>=100?inst.ease:100,inst.volume||1);
}