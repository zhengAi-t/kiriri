//配置里面使用的storage对象
import {init} from './values';
import storage from '../storage';
let result=init({storage});

//配置如何提交游戏数据，因为关闭游戏之前不提交，在内存中为更新的数据就会丢失
window.addEventListener('beforeunload',result.commit);

export default result.observer;