import env from '../env';
env.types.cv.replace=async function(inst,files){
  let url=files.get(inst.file);
  let audio=env.players.cv;
  if(!audio.paused)env.ease(audio,100,0,apply);
  else apply();
  function apply(){
    audio.src=url;
    audio.volume=inst.volume||1;
    audio.play();
  }
}