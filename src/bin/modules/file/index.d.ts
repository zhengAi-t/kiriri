export default interface File{
  read(name:string,offset?:number,length?:number):Promise<Blob>;
  stream(name:string,offset?:number):Promise<ReadableStream>;
}