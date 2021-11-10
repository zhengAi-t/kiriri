# 描述
提供对于用户游戏数据的管理，
注意不是静态的游戏资源，是用户产生的游戏数据，（比如存档或者保存的设置之类的）
# 接口
+ values

保存变量式的用户数据，可以深度递归属性
写属性会被更新到硬盘，不需要额外操作

**举例**
```
import save from './save';
let a=save.values;
a.a=12;
a.b.c=12;//跨级暂时没有实现
//那么下次启动游戏的时候应该还能
a.a===12;
a.b.c==='12';//跨级暂时没有实现
```
+ storage

保存文件

**举例**
```
import save from './save';
let data='123456';
let info={type:'string'};
save.file.save('filename.xx',data,info);
//下次读取的时候应该可以
let result=save.file.read('filename.xx);
result.data;//是二进制数据
result.info.type;//字符串数据‘string’
```
