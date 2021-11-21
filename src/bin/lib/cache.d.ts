interface TurnCacheConfig{
  maxSize?:number;
  getSize?(item:any):number;
  getItem(id:any):Promise<any>;
  destory(item:any):void;
}
interface TurnCache{
  get(id:any):Promise<any>;
}
interface TurnCacheInit{
  createCache(config:TurnCacheConfig):TurnCache;
}
declare var module:TurnCacheInit;
export default module;