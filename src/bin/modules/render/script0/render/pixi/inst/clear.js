import env from '../env';
let clear={};
clear.default=function(inst){
  let item=env.sprites.get(inst.id);
  if(!item)return;
  if(item.animate)item.animate.forEach(s=>env.Animate.cancelAnimate(s));
  env.app.stage.removeChild(item.sprite);
  env.sprites.delete(inst.id);
}
export default clear;