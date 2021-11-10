# 描述
这里提供动画相关的功能
# 接口
createAnimate创建一个动画并执行
skipAnimate跳过一个执行动画
cancelAnimate取消一个动画(注意这个会停在中间状态，动画对象将会被销毁，无法再次回退的操作)
pauseAnimate暂停一个动画
playAnimate继续一个动画
# 注意
对于相同的精灵的同一个的属性值同时请求了多个动画，则只保留最后一个，前面的动画会被取消