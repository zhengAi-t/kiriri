import WebTorrent from "webtorrent/webtorrent.min";
import path from "../../../lib/path";
import Mime from './mime';
let Types=Mime.mime;
async function read(name,offset,length){
  let stream_=await stream(name,offset,length);
  if(!stream_)return;
  let result=await readStream(stream_);
  let fileType=name.match(/\.[a-zA-Z\d]+$/);
  fileType=fileType?Types[fileType[0].slice(1)]:'';
  if(!fileType)console.error('file type encorrect');
  return new Blob(result,{type:fileType});
}
async function stream(name,offset,length){
  if(typeof name!=='string'||!name)return;
  offset=offset||0;
  let file=(files?files:await signalMeta()).get(path.normalize(name));
  if(!file)return;
  if(typeof length!=='number')length=file.length;
  let stream=data.createReadStream({
    start:baseLength+file.offset+offset,
    end:baseLength+file.offset+length
  });
  return stream;
}
function readStream(stream){
  let result=[];
  stream.on('data',chunk=>result.push(chunk));
  return new Promise(rs=>{
    stream.on('end',()=>rs(result));
  });
}
//files 所有文件的元数据{name,offset,length}
//data整个文件;
//baseLength元数据和元数据后面的间隔占用的空间
let files,data,baseLength,signal,resolveSignal;
//signalMeta
function signalMeta(){
  if(signal)return signal;
  signal=new Promise(rs=>resolveSignal=rs);
  return signal;
}
export function addResource(magnetURI){
  let client=new WebTorrent();
  client.add(magnetURI,handlTorrent);
}
/**
 * 
 * @param {WebTorrent.Torrent} torrent 
 */
function handlTorrent(torrent){
  data=torrent.files[0];
  let stream=data.createReadStream({start:0,end:1024*1024*20});
  let meta=[];
  stream.on('data',chunk=>{
    for(let i=0,l=chunk.length;i<l;i++){
      let num=chunk[i];
      if(num!==0){
        meta.push(num);
        continue;
      }
      for(let j=0;j<6;j++){
        let num=chunk[j+i];
        meta.push(num);
        if(num!==0)break;
      }
      if(meta[meta.length-1]!==0)continue;
      return onmetaEnd();
    }
  });
  function onmetaEnd(){
    meta=meta.slice(0,-6);
    let metaString=String.fromCharCode.apply('',meta);
    let metaObject=JSON.parse(metaString);
    baseLength=meta.length+6;
    files=new Map;
    metaObject.forEach(s=>files.set(s.name,s));
    if(resolveSignal)resolveSignal(files);
    signal=null,resolveSignal=null;
    stream.destroy();
  }
}
export default{
  read,stream
}