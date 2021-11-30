/**
 * 在执行代码前，所有的相关加载必须完成，并且带有排队机制
 */
import Taskqueue from "../../../../lib/taskqueue";
import env from '../../env';
import config from './config';
import compile from '../compile';
let queue=Taskqueue.createQueue({
  worker:async function(code){
    let content=compile.compile(code);
    let names=content.filter(s=>s.file).map(s=>s.file);
    let result=new Array(names.length);
    for(let i=0,l=names.length;i<l;i++){
      result[i]=config.render.get(names[i]);
    }
    result=await Promise.all(result);
    let files=new Map;
    for(let i=0,l=names.length;i<l;i++)files.set(names[i],result[i]);
    config.render.exector(content,files);
  },
  onworking(){
    env.event.emit('pendingTask');
  },
  onidle(){
    env.event.emit('freeTask');
  }
});
export default{
  postCode:queue.push
}