//配置里面使用的storage对象
import {init} from './values';
import methods from '../method';
//选择启用一个底层存储方式，优先级排列
let result=init({storage:methods.localstorage|| methods.indexeddb||methods.filesystem});
//配置如何提交游戏数据，因为关闭游戏之前不提交，在内存中为更新的数据就会丢失
window.addEventListener('beforeunload',result.commit);

export default result.observer;