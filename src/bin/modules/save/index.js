import save from './config';
import application from '../buildup';
save.then(s=>application.save=s);
export default save;