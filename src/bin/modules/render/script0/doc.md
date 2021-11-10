# 描述
按照script0实现的渲染模块
# 语法
```
//放置图片
put picture file="file" mix rotate width=0(只能是0-1比例数字) height x y zindex alpha id;

//放置视频
put video file="file" mix rotate width height x y zindex alpha id;

//放置文字
put text text='some text' mix rotate color width height x y alpha zindex fontSize;

//放置图形
put shape type=rectangle mix rotate color width height x y alpha zindex radus;

//修改或者补间动画
set id=12 mix=mut tween=lear ease=1s delay=(1s)(1000ms)(1000) rotate= 15 rad? to? 18.02rad  width=0 to 1 height=1 to 0.5 x= 0 to 1;

//清除
clear id=15 delay=12s;

//代码方式操作 
//使用猴子代码操作内部状态的接口，拓展的接口
hand {

};
```
# 接口
见代码