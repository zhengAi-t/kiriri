import storage from './storage';
import values from './values';
let save={storage,values};
//配置
import application from '../../lib/buildup';
application.save=save;
export default save;