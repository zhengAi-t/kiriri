export default interface Storage{
  /** 保留原始类型 */
  getItem(name:string):any|undefined;
  /** 返回所有的属性值 */
  getItem():object;
  /** 保留原始类型 */
  setItem(name:string,item:any):any;
  /** 清除一个值 */
  clear(name:string):void;
  /** 清除所有 */
  clear():void;
}