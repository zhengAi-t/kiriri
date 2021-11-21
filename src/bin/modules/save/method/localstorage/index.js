import random from '../../../../lib/random';
function save(name,value){
  name=name||random.string();
  value=encode(value);
  localStorage.setItem(name,value);
}
function read(name){
  if(!name)return void(console.error('name is needed'));
  let value=localStorage.getItem(name);
  if(!value)return void(console.warn('value not exist'));
  return decode(value);
}
function remove(name){
  if(!name)console.warn('clear all');
  if(!name)localStorage.clear();
  else localStorage.removeItem(name);
}
function writeStream(){
  return void(console.warn('method is not supported'));
}
function readStream(){
  return void(console.warn('method is not supported'));
}
//对于某种数据类型的编码（保证尽量还原）
function encode(value){
  let type=typeof value;
  if(type==='function')return void(console.error('type function is not allowed'));
  return JSON.stringify({type,value});
}
//对于数据的解码（保证尽量还原原数据类型）
function decode(value){
  return JSON.parse(value).value;
}
export default globalThis.localStorage?{
  save,writeStream,read,readStream,remove
}:undefined;