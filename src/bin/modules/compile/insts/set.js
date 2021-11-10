import env from '../env';
env.parses2.set('set',parseSet);
function parseSet(content){
  let inst={data:{}};
  inst.type=201;
  env.ignoreSpace();
  let string=env.getString();
  inst.data.name=string;
  env.ignoreSpace();
  string=env.getString();
  inst.data.value=env.parseRightvalue(string).result;
  content.push(inst);
}
/**
* 获得一个计算表达式
*/
env.parseRightvalue=function (code){
  let result=[],length=code.length,index=0;
  let signs="+-*/^&|~()";
  let isSign=code=>{
    for(let i=0;i<signs.length;i++){
      if(signs.charCodeAt(i)===code)return true;
    }
    return false;
  }
  while(index<length){
    let codei=code.charCodeAt(index);
    if(env.isNumber(codei)){
      let part=[code[index++]];
      while(index<length){
        if(env.isNumber(code.charCodeAt(index))){
          part.push(code[index++]);
        }else break;
      }
      result.push(Number(part.join('')));
    }else if(env.isFirst(codei)){
      let part=[code[index++]];
      while(index<length){
        if(env.isLetter(code.charCodeAt(index))){
          part.push(code[index++]);
        }else break;
      }
      result.push(part.join(''));
    }else if(isSign(codei)){
      let part=[code[index++]];
      while(index<length){
        if(isSign(code.charCodeAt(index))){
          part.push(code[index++]);
        }else break;
      }
      result.push(part.join(''));
    }else break;
  }
  return {result,next:code.slice(index)};
}