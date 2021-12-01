import env from '../env';
env.insts.clear={};
env.insts.clear.default=function(inst){
  let item=env.sprites.get(inst.id);
  if(!item)return;
  if(item.animate)item.animate.forEach(s=>env.Animate.cancelAnimate(s));
  env.app.stage.removeChild(item.sprite);
  env.sprites.delete(inst.id);
}