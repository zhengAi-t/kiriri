import application from "../../../../lib/buildup";
let render;
let gesture;
let core;
let isInited=false;
application.ui.then(ui=>(ui.addUIframe('Dialog',{show,hide}),init()));
async function init(){
  isInited=true;
  render=await application.render;
  gesture=await application.gesture;
  core=await application.core;
  render.postCode(`
    put text id=sys_dialog_name fontSize=0.035 width=0.3
      x=0.22 y=0.706 zindex=200;
    put text id=sys_dialog_text width=0.601 fontSize=0.04
      x=0.2 y=0.79 zindex=200;
    put picture id=sys_dialog_base file='ui/dialog_base.png'
      width=0.94 height=0.375 x=0.03 y=0.626 zindex=100 alpha=0;
    put picture id=__sys_dialog_text_mask file='mask/__sys_dialog_text_mask.png' alpha=0 zindex=-1;
    hand {
      (async function(){
        let text=env.sprites.get("sys_dialog_text").sprite;
        let textStyle=text.style;
        textStyle.dropShadow=true;
        textStyle.dropShadowDistance=0;
        textStyle.dropShadowBlur=0;
        textStyle.strokeThickness=2.0;
        let name=env.sprites.get("sys_dialog_name").sprite
        let nameStyle=name.style;
        nameStyle.dropShadow=true;
        nameStyle.dropShadowDistance=0;
        nameStyle.dropShadowBlur=0;
        nameStyle.strokeThickness=2.0;
      })();
    };
  `);
}
async function show(config){
  if(!isInited)await init();
  render.postCode(`
    set id=sys_dialog_base alpha=1;
    set id=sys_dialog_name text='${config.name||''}' alpha=1;
    set id=sys_dialog_text text='${config.text}' alpha=1 mask=__sys_dialog_text_mask;
    // put picture id=__sys_dialog_text_mask file='mask/__sys_dialog_text_mask.png';
    set id=__sys_dialog_text_mask ease=2s x= -1.78 to 0.2
      width=2.58 height=0.15 y=0.79 alpha=1;
  `);
  let back=()=>{
    core.event.emit("requestUIReturn");
    gesture.mouse.raw.unwatch('click',back);
  }
  setTimeout(()=>gesture.mouse.raw.watch('click',back),250);
}
function hide(){
  render.postCode(`
    set id=sys_dialog_base alpha=0;
    set id=sys_dialog_name alpha=0;
    set id=sys_dialog_text alpha=0;
  `);
}
