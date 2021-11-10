import application from '../../../../lib/buildup';
let render;
let gesture;
let core;
application.ui.then(ui=>ui.addUIframe('startPage',{show}));
(async function init(){
  render=await application.render;
  gesture=await application.gesture;
  core=await application.core;
})();


let btnAreas=[];
function show(){
  render.postCode(`
    put picture file='./G00/__sys_title_base03.bmp' 
      width=1 height=1 alpha=1 id=title_base zindex=0;
    
    set id=title_base ease=1500ms alpha=0 to 1;
    
    put picture file='./G00/ef_avan_title_staff/__sys_title_main.png'
      x=0.062 y=0.046 width=0.396 height=0.17 alpha=0 id=title_text zindex=1;
    
    set id=title_text delay=2s ease=3s alpha=0 to 1;
    
    put picture file='./G00/__sys_title_continue/0000.bmp'
      width=0.2 height=0.036 x=0.043 y=0.31 id=1 mix=正片叠底;
    
    put picture file='./G00/__sys_title_main01/0000.bmp'
      width=0.2 height=0.036 x=0.043 y=0.37 id=2 mix=正片叠底;
    
    put picture file='./G00/__sys_title_prologue/0000.bmp'
      width=0.2 height=0.036 x=0.043 y=0.43 id=3 mix=正片叠底;
    
    put picture file='./G00/__sys_title_continue/0000.bmp'
      width=0.2 height=0.036 x=0.043 y=0.49 id=4 mix=正片叠底;
    
    put picture file='./G00/__sys_title_load/0000.bmp'
      width=0.2 height=0.036 x=0.043 y=0.55 id=5 mix=正片叠底;
    
    put picture file='./G00/__sys_title_config/0000.bmp'
      width=0.2 height=0.036 x=0.043 y=0.61 id=6 mix=正片叠底;
    
    put picture file='./G00/__sys_title_extra/0000.bmp'
      width=0.2 height=0.036 x=0.043 y=0.67 id=7 mix=正片叠底;
    
    put picture file='./G00/__sys_title_exit/0000.bmp'
      width=0.2 height=0.036 x=0.043 y=0.73 id=8 mix=正片叠底;
    
    set id=1 ease=1s x=0.03 to 0.043 zindex=3;

    set id=2 ease=1s x=0.03 to 0.043 zindex=3;

    set id=3 ease=1s x=0.03 to 0.043 zindex=3;

    set id=4 ease=1s x=0.03 to 0.043 zindex=3;

    set id=5 ease=1s x=0.03 to 0.043 zindex=3;

    set id=6 ease=1s x=0.03 to 0.043 zindex=3;

    set id=7 ease=1s x=0.03 to 0.043 zindex=3;

    set id=8 ease=1s x=0.03 to 0.043 zindex=3;

    put text text='©GLAVETY' width=0.069 height=0.021
      x=0.052 y=0.965 id=copy_right zindex=3;
` );
  let files=[
    './G00/__sys_title_continue/0002.bmp',
    './G00/__sys_title_main01/0002.bmp',
    './G00/__sys_title_prologue/0002.bmp',
    './G00/__sys_title_continue/0002.bmp',
    './G00/__sys_title_load/0002.bmp',
    './G00/__sys_title_config/0002.bmp',
    './G00/__sys_title_extra/0002.bmp',
    './G00/__sys_title_exit/0002.bmp',
  ];
  for(let i=0;i<8;i++){
    let area=gesture.mouse.area.createArea(0.043,0.31+0.06*i,0.2,0.036);
    btnAreas.push(area);
    area.on('mousein',()=>activeBtn(i));
    area.on('mouseout',()=>unactiveBtn(i));
    area.on('click',()=>destory());
  }
  function activeBtn(i){
    // put picture file='./G00/__sys_title_continue/0000.bmp'
    // width=0.2 height=0.036 x=0.043 y=0.31 id=1 mix=正片叠底;
    //set id=7 ease=1s x=0.03 to 0.043 zindex=3;
    //显示mask
    let content=[
      'put picture file=\''+files[i]+'\''+' width=0.2 height=0.036 x=0.043 y='+(0.31+0.06*i)+' id=mask_'+i+' zindex=4 alpha=0.4;\n',
      'set id=mask_'+i+' ease=0.2s alpha= 0.4 to 1;'
    ];
    render.postCode(content.join(''));
  }
  function unactiveBtn(i){
    let content=[
      'set id=mask_'+i+' ease=0.1s alpha=1 to 0;\n',
      'clear id=mask_'+i+' delay=0.3s;'
    ];
    render.postCode(content.join(''));
  }
}
function destory(){
  render.postCode(`
    set id=title_text ease=1000ms alpha=1 to 0;
    set id=title_base ease=3000ms alpha=1 to 0;
    set id=1 ease=1000ms alpha=1 to 0;
    set id=2 ease=1000ms alpha=1 to 0;
    set id=3 ease=1000ms alpha=1 to 0;
    set id=4 ease=1000ms alpha=1 to 0;
    set id=5 ease=1000ms alpha=1 to 0;
    set id=6 ease=1000ms alpha=1 to 0;
    set id=7 ease=1000ms alpha=1 to 0;
    set id=8 ease=1000ms alpha=1 to 0;
    set id=mask_0 alpha=0;
    set id=mask_1 alpha=0;
    set id=mask_2 alpha=0;
    set id=mask_3 alpha=0;
    set id=mask_4 alpha=0;
    set id=mask_5 alpha=0;
    set id=mask_6 alpha=0;
    set id=mask_7 alpha=0;    
    set id=copy_right alpha=0;
  `);
  let clear=()=>render.postCode(`
    clear id=title_text ;
    clear id=title_base ;
    clear id=1 ;
    clear id=2 ;
    clear id=3 ;
    clear id=4 ;
    clear id=5 ;
    clear id=6 ;
    clear id=7 ;
    clear id=8 ;
    clear id=copy_right;
    clear id=mask_0;    
    clear id=mask_1;
    clear id=mask_2;
    clear id=mask_3;
    clear id=mask_4;
    clear id=mask_5;
    clear id=mask_6;
    clear id=mask_7;
  `);
  setTimeout(clear,4000);
  btnAreas.forEach(s=>s.destory());
  let filename='./storys/index.md';
  core.event.emit("requestScript",filename);
  core.event.once("requestScriptReturn",result=>core.pushScript({filename,content:result.main}));
}
