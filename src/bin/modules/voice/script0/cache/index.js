import Cache from "../../../../lib/cache";
import application from '../../../buildup';
import config from './config';
let cache=Cache.createCache({
  maxSize:config.maxSize||(40*1024*1024),
  getItem:async function(filename){
    let blob=await(await application.file).read(filename);
    let url=URL.createObjectURL(blob);
    return {url,size:blob.size,filename}
  },
  getSize(item){
    return item.size;
  },
  destory(item){
    URL.revokeObjectURL(item.url);
  }
});
export default cache;