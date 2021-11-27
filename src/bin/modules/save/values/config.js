//配置里面使用的storage对象
import methods from '../method';
let config={
  //配置采用何种方式来存储，优先级们排列
  storage:methods.localstorage|| methods.indexeddb||methods.filesystem,
  //配置如何提交游戏数据，因为关闭游戏之前不提交，在内存中为更新的数据就会丢失
  commit:commit=>window.addEventListener('beforeunload',commit)
}

export default config;