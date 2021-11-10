import env from "../env";
env.parses2.set("render",parseRender);
function parseRender(content){
  let similer=env.parses2.get("voice");
  similer(content);
  content[content.length-1].type=302;
}