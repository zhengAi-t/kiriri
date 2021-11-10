interface TextureCache{
  getTexture(filename:string):Promise<PIXI.Texture>
}
declare var cache:TextureCache;
export default cache;