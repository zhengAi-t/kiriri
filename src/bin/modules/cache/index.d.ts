interface CacheInitConfig{
  cacheName?:string|number;
  //当没有对应的缓存项时，如何获取缓存内容
  getItem(name:string):any;
  //如何为获得的缓存项计算大小
  getSize?(item:any):number;
  //当缓存项被替换出去的时候，然后如何正确的销毁
  destory(item:any):void;
}
interface Cache{
  //获取一个缓存项，得到的就是保存在里面的缓存内容
  get(name:string):any;
}
export default interface CacheInit{
  //创建自己的缓存区域
  createCache(config:CacheInitConfig):Cache;
  //获得一个已创建的缓存
  getCache(name:string|number):Cache;
}