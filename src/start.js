//整个项目的入口文件
//这里指的是如何整洁的引用代码，
//这里的代码可以在引擎测试时候修改，是由用户自定义的
//引擎所有的代码在bin中
import bin from './bin/index';
alert('点击页面开始（因为播放音乐首先要有权限）');
window.addEventListener('click',()=>bin.start(),{once:true});
