import env from '../env';
env.types.bgm.set=function (inst){
  if(typeof inst!=='number')inst.volume=1;
  env.ease(env.players.bgm,inst.ease>=100?inst.ease:100,inst.volume);
}