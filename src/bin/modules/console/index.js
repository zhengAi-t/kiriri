console.log('已经打开debug模式，控制台可以使用部分的指令');
//直接执行指令
import application from '../../lib/buildup';
window.utls={core:{},render:{}}
utls.core.postCode=async function(code){
  if(typeof code!=='string')return;
  let result=(await application.compile).compile(code);
  (await application.core).pushScript({
    content:result.main
  });
}
application.render.then(s=>window.utls.render=s);
application.voice.then(s=>window.utls.voice=s);
application.gesture.then(s=>window.utls.gesture=s);
application.save.then(s=>window.utls.save=s);