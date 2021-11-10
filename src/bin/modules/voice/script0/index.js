import compile from "./compile";
import exector from "./exector";
function postCode(code){
  let content=compile.parseCode(code);
  exector.exector(content);
}
export default{
  postCode,
  event:exector.event
}