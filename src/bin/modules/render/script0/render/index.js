import postcode from "./postcode";
import preload from "./preload";
import config from './config';
export default{
  postCode:postcode.postCode,
  getWindow:config.render.getWindow,
  prepareCode:preload.prepareCode
}