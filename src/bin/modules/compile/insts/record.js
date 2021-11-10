import env from '../env';
env.parses2.set('record',parseRecord);
function parseRecord(content){
  let inst={data:{}};
  inst.type=202;
  env.ignoreSpace();
  let string=env.getString();
  inst.data.name=string;
  env.ignoreSpace();
  string=env.getString();
  inst.data.value=env.parseRightvalue(string).result;
  content.push(inst);
}