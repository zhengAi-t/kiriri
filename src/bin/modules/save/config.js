let save={};

//选择启用哪些存储方式
import values from './values';
save.values=values;

import method from './method';
save.raw=method.indexeddb||method.filesystem||method.localstorage;

//是否配置自动化构建
import application from '../../lib/buildup';
application.save=save;
export default save;