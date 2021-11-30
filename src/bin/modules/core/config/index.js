/**
 * 配置core的环境
 * 核心不与任意模块耦合，所以需要自己处理核心抛出的一些事件
 */
import core from '../core';
import {init} from '../core';
import application from '../../buildup';
(async function(){
  //使用自动化模块加载系统，具体见库代码
  application.core=core;

  let save=await application.save;
  let cache=await application.cache;
  init({record:save.values,cache});

  //需要执行UI操作的中断,普通UI，没有控制操作
  //中断返回为 requestUIReturn(config)
  core.event.on("requestUI",signalRequestUI);
  let ui=await application.ui;
  async function signalRequestUI(name,opt,config){
    if(!ui)return console.warn('module ui is not defined');
    ui.signal(name,opt,config);
  }

  //需要执行声音操作的信号,不中断
  core.event.on("requestVoice",signalRequestVoice);
  let voice=await application.voice;
  async function signalRequestVoice(code){
    voice.postCode(code);
  }

  //需要画面渲染模块操作的信号,不中断
  core.event.on("requestRender",signalRequestRender);
  let render=await application.render;
  async function signalRequestRender(code){
    render.postCode(code);
  }

  //中断返回为 requestScriptReturn
  //因为可以自定义如何处理加载脚本的请求，有点时候为了性能或者加密，
  //举例：构建的时候就编译好代码，这里直接解析，同时不挂载编译模块
  core.event.on("requestScript",signalRequestScript);
  let file=await application.file;
  let compile=await application.compile;
  async function signalRequestScript(name){
    let blob=await file.read(name);
    let code=await blob.text();
    let result=compile.compile(code);
    core.event.emit("requestScriptReturn",result);
  }


  //语法扩展
  //需要外部程序的通用中断
  core.event.on("requestExtension",signalRequestExtension);
  async function signalRequestExtension(paras){
    if(paras.length===0)return void(window.addEventListener('click',core.goOn,{once:true}));
    ui.signal(paras[0],paras[1]);
    setTimeout(core.goOn,0);
  }

  //预加载声音的信号，如果想要体验优化，最好对这个事件进行绑定
  core.event.on("prepareVoice",(content,index)=>voice.prepareCode(content,index));
  
  //预加载渲染的信号，如果想要体验优化，最好对这个事件进行绑定
  core.event.on("prepareRender",(content,index)=>render.prepareCode(content,index));

  //当渲染和声音模块出现忙等待时，锁定核心
  voice.event.on('pendingTask',core.lock);
  render.event.on('pendingTask',core.lock);

  //当渲染和声音模块忙等待取消时，解锁核心
  voice.event.on('freeTask',core.unlock);
  render.event.on('freeTask',core.unlock);
  //建议把各种核心管理的工具函数都监听在核心这里
  //这样所有和引擎相关的代码都在模块中了，当然，
  //在外部引用core然后编写对应的工具函数也行，不过那样就会对外暴露过多的接口
  // 默认配置的启动事件，发送请求开始页面的信号
  core.event.on("GameStart",signalGameStart);
  function signalGameStart(){
    let filename='./storys/index.md';
    core.event.emit("requestScript",filename);
    core.event.once("requestScriptReturn",result=>core.pushScript({filename,content:result.main}));
  }
})();