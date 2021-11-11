import Mouse from './mouse';
import Keyboard from './keyboard';
export default interface Gesture{
  //所有的鼠标手势
  mouse:Mouse ;
  //所有的键盘手势（不包括输入文字）
  keyboard: Keyboard;
  //其他扩展的手势类型
  [propName:string]:object;
}