import capture from '../capture';
import {dispatch} from './area';
let listeners=new Map;
/**
 *  name的值为 mouseup mousedown click 
 *  mousein mouseout mousemove
 */
let handls={};
function defaultCountUp(name){
  function up(){
    if(listeners.has(name))listeners.get(name).count++;
    else{
      let listener=(x,y)=>dispatch(name,x,y);
      listeners.set(name,{count:1,listener});
      capture.watch(name,listener);
    }
  }
  return up;
}
function defaultCountDown(name){
  function down(){
    if(!listeners.has(name))return;
    let item=listeners.get(name);
    item.count--;
    if(item.count>0)return;
    listeners.delete(name);
    capture.unwatch(name,item.listener);
  }
  return down;
}
handls.mouseup={};
handls.mouseup.up=defaultCountUp('mouseup');
handls.mouseup.down=defaultCountDown('mouseup');
handls.mousedown={};
handls.mousedown.up=defaultCountUp('mousedown');
handls.mousedown.down=defaultCountDown('mousedown');
handls.click={};
handls.click.up=defaultCountUp('click');
handls.click.down=defaultCountDown('click');
handls.mousemove={};
handls.mousemove.up=defaultCountUp('mousemove');
handls.mousemove.down=defaultCountDown('mousemove');

export default handls;