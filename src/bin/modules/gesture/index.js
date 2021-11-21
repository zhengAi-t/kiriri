/**
 * 对于用户手势的捕捉
 * 包括鼠标动作和键盘动作,
 * 另外如果有两种手势之外的手势，
 * 也可以放进这个地方统一管理
 */
import gestures from './config';
import application from '../buildup';
application.gesture=gestures;
export default gestures;