/**
 * 这里是测试静态文件下载的打桩
 */
async function read(name,offset,length){
  if(offset||length)console.warn('file:default 未实现');
  let result=await fetch(name);
  return result.blob();
}
export default{read}