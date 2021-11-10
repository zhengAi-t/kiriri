/**
 * 这个库用来创建一个微任务，在下一刻调用
 */
let microTask;
if(globalThis.process&&process.nextTick)microTask=process.nextTick;
else if(window.queueMicrotask)microTask=window.queueMicrotask.bind(window);
else if(window.Promise)microTask=(callback)=>window.Promise.resolve().then(callback);
else if(window.setTimeout)microTask=(callback)=>window.setTimeout(callback,0);
export default{
  microTask
}