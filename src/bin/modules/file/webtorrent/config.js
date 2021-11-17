import  {addResource} from './webtorrent';
//本文件为配置文件，下面的是默认的配置
//需要配置这个模块是如何得到magnetURI的
//这里的代码不属于引擎自身
addResource('magnet:?xt=urn:btih:c53baf7f52c9382d8efce16a34898b2044c168a6&dn=game.pak&tr=wss%3A%2F%2Ftomodachi.top%3A19673&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com');
// import application from '../../../lib/buildup';
// if(location){
//   let match=location.href.match(/magnet:\?[a-zA-Z%=&\.\-:]+/);
//   if(match)addResource(match[0]);
//   else showInput();
// }
// function showInput(){
//   if(document&&document.body)createInput();
//   else window.addEventListener('DOMContentLoaded',createInput,{once:true});
// }
// function createInput(){
//   let input=document.createElement('input');
//   input.placeholder='请输入游戏链接';
//   document.body.appendChild(input);
//   let button=document.createElement('input');
//   button.onclick=handlsummit;
//   document.body.appendChild(button);
//   input.style.position='fixed';
//   input.style.top='0';
//   input.style.zIndex=1;
//   button.type='button';
//   button.style.zIndex=1;
//   button.style.position='fixed';
//   button.style.top='0';
//   button.value='开始';
//   button.style.left='176px';
//   function handlsummit(){
//     let value=input.value;
//     let match=value.match(/magnet:\?[a-zA-Z%=&\.\-:\d]+/);
//     if(!match)return;
//     document.body.removeChild(input);
//     document.body.removeChild(button);
//     addResource(match[0]);
//     application.core.then(core=>core.event.emit('GameStart'));
//   }
// }
