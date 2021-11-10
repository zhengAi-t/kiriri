# 描述
获取静态资源文件的统一接口
# 接口
read(name,offset,length):promise\<blob\>
stream(name,offset):promise\<Readablestream\>
> 当前模块还没有被实现，只是使用fetch打桩
