/**
 * 如果有的指令执行时精灵还没有加载完成，则需要进入待定队列
 * 同一个精灵堆积了很多指令，只保留最后一个
 */
import event from '../../../../../lib/eventsys';
import InstCollect from './inst';
let queue=event.EventSys();
function setInstSleep(inst){
  queue.once(inst.id,()=>InstCollect[inst.opt][inst.type||'default'](inst));
}
function wakeSleepInst(id){
  queue.emit(id);
}
export default{setInstSleep,wakeSleepInst}