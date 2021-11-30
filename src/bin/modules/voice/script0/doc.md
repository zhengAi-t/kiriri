# 描述
这里是第0套声音控制系统语法实现的系统
# 语法

+ bgm
```
替换
bgm replace file="file" volume=1
      ease=1000  delay=100 loop;(loop不用添加属性值)

修改
bgm set volume=1 ease=1000 delay=100;

暂停
bgm pause ease=1000 delay;

继续
bgm resume volume=1 ease=1000 delay;
```
+ cv
```
替换
cv replace "file" delay volume;

跳过
cv skip delay ease;
```
+ se
```
添加
se add "file" volume ease delay loop id;

移除
se remove id delay ease;

修改
se set id volume ease delay;

暂停
se pause id ease delay;

继续
se resume id ease delay volume;
```
+ 扩展
```
hand {
//any code wrote here

};
```
# 接口
postCode,接受代码段投递
prepareCode,接受预测信息，也可以不提供，无法接受预测信息