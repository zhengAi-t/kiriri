import Cache from "../../../../lib/cache";
function init(config){
  return Cache.createCache({
    maxSize:config.maxSize||(40*1024*1024),
    getItem:async function(filename){
      let blob=await config.file.read(filename);
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
}
export default{
  init
}