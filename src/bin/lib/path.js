/**
 * 这个模块返回路径标准化之后的结果，统一\为/，去掉多余的分隔符
 */
function normalize(path){
  let result=[];
  let index=0,length=path.length;
  while(index<length){
    if(path[index]==='/'||path[index]==='\\'){
      index++;
      continue;
    }
    let name=[];
    while(index<length){
      let char=path[index];
      if(char==='/'||char==='\\')break;
      name.push(char);
      index++;
    }
    name=name.join('');
    if(name==='.')continue;
    if(name==='..')result.pop();
    else result.push(name);
  }
  return result.join('/');
}
export default{
  normalize
}