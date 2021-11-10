let tweens=new Map;
function linear(x){
  return x;
}
function accelerate(x){
  return x*(x+1)/2;
}
function decelerate(x){
  return -x*(x-2);
}
tweens.set('linear',linear);
tweens.set("accelerate",accelerate);
tweens.set("加速",accelerate);
tweens.set("decelerate",decelerate);
tweens.set("减速",decelerate);
function create(cfg){
  cfg.name=cfg.name||'linear';
  return tweens.get(cfg.name);
}
export default{
  create
}