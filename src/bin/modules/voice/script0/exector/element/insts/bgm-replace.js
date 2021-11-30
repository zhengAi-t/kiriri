import env from '../env';
env.types.bgm.replace=function(inst,files){
  let url=files.get(inst.file);
  let audio=env.players.bgm;
  if(!audio.paused) env.ease(audio,100,0,apply);
  else apply();
  function apply(){
    audio.loop=!!inst.loop;
    audio.src=url;
    env.ease(audio,inst.ease>=100?inst.ease:100,inst.volume||1);
    audio.play();
  }
}