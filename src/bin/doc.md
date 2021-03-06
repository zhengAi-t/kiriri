# 描述
这里包含游戏程序和引擎相关的所有代码
# 接口
导出了一些工具函数，供外部操控这个游戏
比如开始，强行终止，其他见代码
# 如何看懂代码
找本目录下的doc.md，这个文件描述了当前模块的作用，

然后查看config.js，这个文件描述了当前模块如何进行配置的
# 注意事项
+ 如果不需要修改引擎本身的架构或者功能,或者调整接口内容，或者修改bug

  不允许修改任何除了名称为config.js以外的任意文件，这会造成配置起来困难

+ 所有的名称带有test的文件或者文件夹,

  都是测试代码,和项目本身无关，同时，也请在修改任何代码时编写测试在同级的test文件夹中进行自测

+ 所有的子模块导出文件的名称为index.js

  定义文件为index.d.ts

+ 任意模块提供给外部使用的接口用default，任意提供给外部配置的接口不能用default

+ 所有的模块内必须包含index.js

+ 所有模块内必须有doc.md文件用来描述这个模块

  前两项必须为"描述"和"接口"

  如果"接口"项不需要代码以外的其他描述，写"见代码"

  而这个代码指这个模块的index.js

+ 项目中需要创建子项目，请遵守以上规则

+ （重要）由于会出现index和config相互引用的情况,调整结构以避免出错

+ 属于不同顶层模块中的代码，不得相互调用,(lib中提供了模块引入的方式,buildup)

  使用自定义的动态导入方式的好处是，解耦合使用方不需要知道对应模块的位置，

  比如core中调用save或者render

+ 任意代码文件（除了定义文件外），原则上长度不能超过120行，最好控制在60行以下

+ 任意代码文件，缩进的级数原则上不能超过4，最好在1-2徘徊

+ 代码缩进的大小统一改为2个空格，语句结束必须要有分号

**以上规则为约定，请尽量遵守，如果发现有不合适的，可以提出来修改。**