**核心脚本请求返回的行为改变，接收整个编译结果，自行在内部选择对应正文，并且自行缓存**

**核心脚本请求行为改变，仅仅只给出需要的脚本文件的名称**

**核心的脚本缓存系统**

**核心增加功能，对于声音脚本和画面脚本，还有通用中断，会先发一个预告（不见得会执行）**

**取消渲染和声音的pengding模块，转而使用阻塞渲染，忙等待**

**核心增加功能，监听并接受忙等待请求，取消忙等待请求**

**声音和画面模块增加队列，当队列过长时，会产生任务过重的事件**

检查“UI组件中断”的核心代码,需要根据config执行后续操作

声音模块的编译算法全部需要重写，分属性，分指令放到不同文件中

渲染模块的乱序指令pengding 模块，增加功能。--当时间超过3秒，就取消指令，并且打印错误

核心指令break的参数编译功能完善，支持解析引号包裹字符串

核心指令set和record的兼容性写法，当没有引号包裹时尝试解析

当核心出现set和record变量名同名的时候，控制台警告

渲染模块的编译模块的重构

ui组件中添加默认的组件库，“对话框”，“标题页”

发现问题，仅仅set精灵属性无法跳过冲突的动画,当前采用动画冲突自动跳过的方式处理

渲染模块，如果增加的精灵与画面中存在的精灵有相同的id，就替换

voice 模块的执行模块需要拆分，环境，过渡管理，指令集

增加功能，render模块放置图片默认等比例缩放

大量的d.ts文件还没有编写

attach附加模式的调试器，可以通过本地的webrtc传送数据

数据模块的tracker地址由magurl字符串给出