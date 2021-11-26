let render;
async function postCode(code){
  let decode=new TextDecoder();
  let blob=new Blob([code]);
  let buffer=await blob.arrayBuffer();
  code=decode.decode(buffer);
  render.postCode(code);
}
function init(config){
  render=config.render;
  return {
    postCode,
    event:render.event,
    getWindow:render.getWindow,
    prepareCode:render.prepareCode
  };
}
export default {
  init
}