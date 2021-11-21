import zangodb from 'zangodb';
let db=new zangodb.Db('game',{file:['name']});
let files=db.collection('file');
async function save(name,value){
  await files.remove({name});
  await files.insert([{name,value}]);
  return true;
}
async function read(name){
  let result=await files.findOne({name});
  return result.value;
}
function remove(name){
  return files.remove({name});
}
function writeStream(name){
  return void(console.warn('method is not supported'));
}
function readStream(name){
  return void(console.warn('method is not supported'));
}
export default globalThis.indexedDB?{
  save,writeStream,read,readStream,remove
}:undefined;