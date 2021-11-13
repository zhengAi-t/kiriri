export default interface WebTorrentSys{
  /** 通过blob方式获得文件，一般是文件全部加载了才能使用的文件（或者小文件）*/
  read(name:string,offset?:number,length?:number):Promise<Blob>;
  /** 通过流方式获得文件，一般是需要分批处理的大文件 */
  stream(name:string,offset?:number):Promise<ReadableStream>;
}
/** 添加一条游戏的磁力链接 */
export function addUrl(magnetURI:string):void;