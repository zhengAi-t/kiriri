import env from '../env';
env.types.se.set=function(inst){
  let audio=env.players.se.get(inst.id);
  if(!audio)return;
  env.ease(audio,inst.ease>=100?inst.ease:100,inst.volume||0);
}