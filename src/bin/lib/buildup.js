/**
 * 这是用来构建这个应用所有模块的设计模式
 * 这个模块可以保证控制模块启动的时序正确，
 * 并且保证了按照统一的名字获得一个模块，
 * 这样用户可以任意自定义不同的模块实现挂载到这个系统中，
 * 而且也可以选择不挂载某个模块，只要没有使用到就不会出问题
 * 
 * 直接读取某个属性就是在获取名称为xxx的模块，返回一个Promise，
 * 如果三秒后这个模块还没有被挂载成功（一般是没有执行挂载），就会reject
 * application.xxx
 * 
 * 直接写某个属性代表挂载名称为这个属性的一个模块
 * application.xxx=module
 */
let application=new Proxy({},{get:getter,set:setter});
let pendings=new Map;
async function getter(object,name){
  if(object[name]){
    console.log('get',name,'ok');
    return object[name];
  }
  let task=waker(name);
  let pending=new Promise(task);
  return pending;
}
function setter(object,name,value){
  console.log('set',name,'ok');
  if(object[name])console.error('modules are named contradictory',name);
  object[name]=value;
  if(pendings.has(name))pendings.get(name).forEach(s=>s(value)||console.log('get',name,'ok'));
  pendings.delete(name);
  return true;
}
function waker(name){
  let rs=()=>0;
  let resolve=value=>rs(value)||clearTimeout(ctrl)||pendings.delete(name);
  let reject=()=>console.error('modules takes too long',name)||resolve();
  let ctrl=setTimeout(reject,3000);
  if(!pendings.has(name))pendings.set(name,new Set);
  let set=pendings.get(name);
  set.add(resolve);
  let task=rs_=>rs=rs_;
  return task;
}
export default application;