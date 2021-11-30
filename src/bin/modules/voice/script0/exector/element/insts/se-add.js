import env from '../env';
env.types.se.add=function(inst,files){
  let url=files.get(inst.file);
  let audio=new Audio;
  audio.loop=!!inst.loop;
  env.players.se.set(inst.id,audio);
  audio.src=url;
  audio.play();
  env.ease(audio,inst.ease>=200?inst.ease:200,inst.volume||1);
  audio.onpause=()=>env.players.se.delete(inst.id);
}