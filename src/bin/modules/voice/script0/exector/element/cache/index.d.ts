interface CacheItem{
  /** blob url 一个类似 blob://http://xxx-xxx-xxx 的字符串 */
  url:string;
  size:number;
  filename:string;
}
interface Cache{
  get(filename:string):CacheItem;
}
function get(name:string):any;
declare var cache={get};
export default cache;