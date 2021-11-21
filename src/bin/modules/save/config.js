let save={};

//选择启用哪些存储方式
import values from './values';
save.values=values;

import method from './method';
save.raw=method.indexeddb||method.filesystem||method.localstorage;

export default save;