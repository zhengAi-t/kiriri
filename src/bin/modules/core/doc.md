# 描述
游戏流程控制核心，也是引擎的核心，
用于抛出事件协调控制所有的其他部分的工作
可以外部指定入口或者一个快照状态开始流程
# 接口
+ event:Eventsys,

    EventSys见src/lib/eventsys描述
    现有事件

    //需要一个UI组件响应请求
    requestUI
    //UI组件响应请求结束，交回控制权
    requestUIReturn


    //需要声音模块响应请求（声音模块响应请求时，核心不会被挂起）
    requestVoice
    //需要渲染模块响应请求（声音模块响应请求时，核心不会被挂起）
    requestRender


    //需要载入一个脚本文件的请求
    requestScript
    //载入脚本文件结束，交回控制权并投递结果
    requestScriptReturn

    //脚本中出现主动中断，核心被挂起，用户可以自定义任意的中断响应操作
    //这个事件一般用来扩展引擎的功能（比如要挂起引擎运行一个小游戏）
    requestExtension

+ loadScript(script:Script):void,
    载入脚本，
    覆盖当前执行状态

+ pushScript(script:Script):void,
    推入脚本
    挂起当前脚本，并在当前环境执行新脚本

+ takeSnapshot():Snapshot,
    获取当前状态快照  

+ loadSnapshot(snapshot:Snapshot):void,
    恢复快照状态

+ goOn():void,
    强制继续，如果核心被挂起，但是还没有被交回控制权，也会被强制唤醒


+ hand(config:object):any
    长臂干涉状态
    留给未来使用，用于猴子代码直接操控引擎核心，可用来扩展功能。
    因为是猴子代码，所以只是在正式功能被添加之前测试功能的实用性

**与其他的模块的耦合需要配置，具体见event的配置，当前写在config.js中**