# 描述
基于webtorrent 实现的数据加载系统
# 接口
见index.d.ts
# 注意事项
要使用这个模块作为file模块的基础，首先需要一个种子
所有的游戏文件，必须先采用 打包工具打包，（kiriri-file-webtorrent-packager）
然后把得到的文件放到webtorrent上面做种，这样才能得到这个模块所需要的magnetURI

模块需要一些tracker服务器和信令服务器，暂时采用的是开源免费的服务器，速度较慢，未来可能不可用