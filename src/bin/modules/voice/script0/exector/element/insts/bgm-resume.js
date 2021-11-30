import env from '../env';
env.types.bgm.resume=function(inst){
  env.players.bgm.volume=0;
  env.players.bgm.play();
  env.ease(env.players.bgm,inst.ease>=100?inst.ease:100,inst.volume||1);
}