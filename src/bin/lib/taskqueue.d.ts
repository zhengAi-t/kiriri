interface QueueInitConfig{
  /**
   * 如何执行任务队列中的任务
   */
  worker(item:any):Promise<void>;
  /**
   * 当任务队列繁忙的时候调用
   */
  onworking?:Function;
  /**
   * 当任务丢列空闲的时候调用
   */
  onidle?:Function;
}
interface TaskQueue{
  /**
   * 向队列中添加一个任务
   */
  push(item:any):number;
  /**
   * 取消队列中的一个任务,返回被取消的任务
   * 如果任务已经开始，就不能取消了
   */
  cancel(handl:number):any;
  /**
   * 暂停任务队列的执行
   */
  pause():void;
  /**
   * 继续任务队列的执行
   */
  goOn():void;
  /**
   * 任务队列中现有的任务(禁止修改)
   */
  tasks:Map<number,any>;
}
interface Init{
  /**
   * 创建一个任务队列
   */
  createQueue(config:QueueInitConfig):TaskQueue;
}
declare var init:Init;
export default init;