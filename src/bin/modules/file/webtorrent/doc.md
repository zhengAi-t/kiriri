# 描述
基于webtorrent 实现的数据加载系统
# 接口
见index.d.ts
# 注意事项
要使用这个模块作为file模块的基础，首先需要一个种子
所有的游戏文件，必须先采用 打包工具打包，（kiriri-file-webtorrent-packager）
然后把得到的文件放到webtorrent上面做种，这样才能得到这个模块所需要的magnetURI

由于公共的tracker比较慢，所以需要自己手动添加一些tracker，这里我提供我自己搭建的一个
wss://tomodachi.top:19673
