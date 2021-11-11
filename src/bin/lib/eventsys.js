/**
 * 采用事件模型进行模块间通讯的事件模块通用构造函数
 */
import microTask from "./microTask";
function EventSys(){
  let collects={};
  let reflashCount=0;
  let limitCount=400;
  /**
   * 刷新数据对象，防止过多的属性名造成内存泄漏
   */
  function reflash(){
    if(reflashCount++<limitCount)return;
    reflashCount=0;
    limitCount=0;
    let newCollects={};
    for(let i in collects){
      let collect=collects[i];
      if(collect.on.length===0&&
        collect.once.length===0)continue;
      newCollects[i]=collect;
      limitCount++;
    }
    limitCount=limitCount*2;
    if(limitCount<400)limitCount=400;
    collects=newCollects;
  }
  /**
   * 触发一个事件需要延迟执行
   */
  function emit(name,...argvs){
    microTask.microTask(()=>{
      if(!collects[name])return ;
      let on=collects[name].on;
      on.forEach(s=>s.apply(null,argvs));
      let once=collects[name].once;
      collects[name].once=[];
      once.forEach(s=>s.apply(null,argvs));
      reflash();
    });
  }
  /**
   * 绑定一个事件,
   * 互斥绑定,会取消同名的其他事件监听器
   */
  function append(name,callback){
    collects[name]={on:[callback],once:[]};
  }
  /**
   * 绑定一个事件监听器，
   * 互斥绑定，单次触发
   */
  function appendOnce(name,callback){
    collects[name]={on:[],once:[callback]};
  }
  /**
   * 取消一个监听器，或者取消所有监听器
   */
  function clear(name,callback){
    if(!name)return void(collects={});
    if(!callback)return void(collects[name]={on:[],once:[]});
    let on=collects[name].on;
    let once=collects[name].once;
    collects[name]={
      on:on.filter(s=>s!==callback),
      once:once.filter(s=>s!==callback)
    };
    reflash();
  }
  /**
   * 绑定一个事件监听器
   */
  function on(name,callback){
    if(!collects[name]){
      collects[name]={on:[],once:[]};
    }
    collects[name].on.push(callback);
  }
  /**
   * 绑定一个事件监听器
   */
  function once(name,callback){
    if(!collects[name]){
      collects[name]={on:[],once:[]};
    }
    collects[name].once.push(callback);
  }
  return {emit,on,once,clear,append,appendOnce};
}
export default{
  EventSys
}