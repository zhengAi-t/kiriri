import mouse from './mouse';
import keyboard from './keyboard';
import application from '../../lib/buildup';
let gesture={mouse,keyboard};
application.gesture=gesture;
export default gesture;