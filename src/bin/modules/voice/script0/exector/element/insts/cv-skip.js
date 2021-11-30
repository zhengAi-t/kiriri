import env from '../env';
env.types.cv.skip=function(){
  env.ease(env.players.cv,100,0,()=>{
    env.players.bgm.pause();
  });
}