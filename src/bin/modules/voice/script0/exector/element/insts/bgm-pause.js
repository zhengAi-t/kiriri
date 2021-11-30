import env from '../env';
env.types.bgm.pause=function(inst){
  env.ease(env.players.bgm,inst.ease>=600?inst.ease:600,0,()=>{
    env.players.bgm.pause();
  });
}