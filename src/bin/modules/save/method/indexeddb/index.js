import zangodb from 'zangodb';
import random from '../../../../lib/random';
let db=new zangodb.Db('game',{file:['name']});
let files=db.collection('file');
async function save(name,value){
  if(!name)console.warn('name is null');
  name=name||('tmp/'+random.string());
  await files.remove({name});
  await files.insert([{name,value}]);
  return true;
}
async function read(name){
  if(!name)return void(console.error('name is needed'));
  let result=await files.findOne({name});
  return result.value;
}
function remove(name){
  if(!name)console.warn('clear all');
  if(!name)return files.remove({});
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