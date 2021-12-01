import fs from 'fs/promises';
import fs_ from 'fs';
import random from '../../../../lib/random';
import config from './config';
function save(name,value){
  if(!name)console.warn('name is null');
  name=name||('tmp/'+random.string());
  return fs.writeFile(config.savePath+'/'+name,encode(value));
}
function read(name){
  if(!name)return void(console.error('name is needed'));
  return fs.readFile(config.savePath+'/'+name);
}
function remove(name){
  if(!name)return void(console.error('name is needed'));
  return fs.rm(config.savePath+'/'+name);
}
function writeStream(name){
  if(!name)console.warn('name is null');
  name=name||('tmp/'+random.string());
  return fs_.createWriteStream(config.savePath+'/'+name);
}
function readStream(name){
  if(!name)return void(console.error('name is needed'));
  return fs_.createReadStream(config.savePath+'/'+name);
}
function encode(value){
  console.error('未实现');
}
export default globalThis.process?{
  save,writeStream,readStream,read,remove
}:undefined;