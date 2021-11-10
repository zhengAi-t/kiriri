import env from "../env";
env.parses2.set('block',parseBlock);
function parseBlock(content){
  env.ignoreSpace();
  let name=env.getString();
  env.ignoreBlank();
  env.index++;//去掉{
  let newContent=[];
  env.compileBlock(newContent);
  env.content.blocks[name]=newContent;
}