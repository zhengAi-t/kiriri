interface CacheItem{
  /** blob url 一个类似 blob://http://xxx-xxx-xxx 的字符串 */
  url:string;
  size:number;
  filename:string;
}
export default interface Cache{
  get(filename:string):CacheItem;
}