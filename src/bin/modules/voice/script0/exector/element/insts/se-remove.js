import env from '../env';
env.types.se.remove=function(inst){
  let audio=env.players.se.get(inst.id);
  if(!audio)return;
  env.ease(audio,inst.ease>=100?inst.ease:100,0,()=>{
    audio.pause();
    env.players.se.delete(inst.id);
  });
}