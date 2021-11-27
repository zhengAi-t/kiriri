import config from "./config";
let keywords=config.keywords;
function parseCode(code){
  function ignoreBlank(){
    let match=code.match(/^[\r\n\s]+/);
    if(match)code=code.slice(match[0].length);
  }
  let isChar=key=>(key>96&&key<123)||(key>64&&key<91);
  let isOthers=key=>key>255;
  let converKeyword=word=>keywords[word];
  function getKeyword(){
    ignoreBlank();
    let result=[];
    for(let i=0,l=code.length;i<l;i++){
      let key=code.codePointAt(i);
      if(!isChar(key)&&!isOthers(key))break;
      result.push(code[i]);
    }
    code=code.slice(result.length);
    let keyword=converKeyword(result.join(''));
    if(result.length&&!keyword)console.error('unknown keyword',word)
    return keyword;
  }
  function parseHand(){
    ignoreBlank();
    let stack=0,length=code.length,index=0;
    while(index<length){
      if(code[index]==='\\')index++;
      if(code[index]==='{')stack++;
      else if(code[index]==='}'&&stack--<=0)break;
      index++;
    }
    let data=code.slice(1,index);
    code=code.slice(index+1);
    ignoreBlank();
    code=code.sice(1);
    result.push({type:'hand',code:data});
  }
  function parseQuery(){
    let result={};
    while(code.length&&code[0]!==';'){
      ignoreBlank();
      let key=getKeyword();
      if(!key)break;
      if(key==='loop'){
        result[key]=true;
        continue;
      }
      ignoreBlank();
      code=code.slice(1);
      ignoreBlank();
      if(key==='file'){
        result[key]=getString();
        continue;
      }
      let match=code.match(/^[^\r\n\s;]+/)[0];
      code=code.slice(match.length);
      let testnum=Number(match);
      if(testnum<Infinity)match=testnum;
      result[key]=match;
    }
    ignoreBlank();
    code=code.slice(1);
    return result;
  }
  function getString(){
    let result=[];
    for(let i=1,l=code.length;i<l;i++){
      if(code[i]==='\\')i++;
      if(code[i]===code[0]){
        code=code.slice(i+1);
        return result.join('');
      }
      result.push(code[i]);
    }
  }
  let result=[];
  while(code.length){
    let start=code.length;
    let word1=getKeyword();
    ignoreBlank();
    if(word1==='hand'){
      parseHand();
      continue;
    }
    let word2=getKeyword();
    let query=parseQuery();
    query.type=word1,query.opt=word2;
    result.push(query);
    let stop=code.length;
    if(start!==stop){
      ignoreBlank();
      continue;
    }
    console.error('语法错误');
    let match=code.match(/^[^\r\n]*/);
    if(match)code=code.slice(match[0].length);
  }
  return result;
}
export default {
  parseCode
}