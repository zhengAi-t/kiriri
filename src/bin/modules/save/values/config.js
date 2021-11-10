//配置里面使用的storage对象
import {init} from './values';
import storage from '../storage';
let result=init({storage});

window.addEventListener('beforeunload',result.commit);

export default result.observer;