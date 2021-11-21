import config from './config';
let env={};
env.keywords=config.keywords;
env.compileMain=function(code){
  env.code=code;
  env.index=0;
  env.length=code.length;
  env.content={main:[],blocks:{}};
  env.compileBlock(env.content.main);
  let result=env.content;
  env.code='null';
  env.content=null;
  return result;
}
/**
* 忽略前导空行或者空格
*/
env.ignoreBlank=function(){
  let match=env.code.slice(env.index).match(/^[\s\r\n]+/);
  if(match)env.index+=match[0].length;
}
/**
   * 忽略前导空格
   */
env.ignoreSpace=function(){
  let match=env.code.slice(env.index).match(/^[\f\r\t\v ]+/);
  if(match)env.index+=match[0].length;
}
env.compileBlock=function (content){
  while(env.index<env.length){
    env.ignoreBlank();
    if(env.index>=env.length)break;
    if(env.code[env.index]==='}'){
      env.index++;
      return;
    }
    let parse=env.parses1.get(env.code[env.index]);
    if(parse)parse(content);
    else env.parses1.get('default')(content);
  }
}
env.parses1=new Map;
env.parses1.set("#",parse1);
function parse1(content){
  env.index++;
  env.ignoreSpace();
  let keyword=env.getKeyword();
  if(!keyword||keyword.length===0)console.error('compile error');
  env.parses2.get(keyword)(content);
}
env.parses2=new Map;
let is_=code=>code===95;
env.is_=is_;
let isCharL=code=>code>96&&code<123;
env.isCharL=isCharL;
let isCharU=code=>code>64&&code<91;
env.isCharU=isCharU;
let isChar=code=>isCharL(code)||isCharU(code);
env.isChar=isChar;
let isOthers=code=>code>127;
env.isOthers=isOthers;
let isNumber=code=>code>47&&code<58;
env.isNumber=isNumber;
let isFirst=code=>isChar(code)||is_(code)||isOthers(code);
env.isFirst=isFirst;
let isLetter=code=>isFirst(code)||isNumber(code);
env.isLetter=isLetter;
/**
 * 获得关键字
 */
env.getKeyword=function(){
  let result=[];
  while(env.index<env.length){
    let codei=env.code.charCodeAt(env.index);
    if(isChar(codei)||isOthers(codei)){
      result.push(env.code[env.index]);
    }else break;
    env.index++;
  }
  let keyword=env.keywords[result.join('')];
  if(!keyword)console.error('compile error');
  return keyword;
}
/**
 * 获得一个字符转内容反转义结果
 */
env.getString=function(){
  let result=[];
  let begin=env.code[env.index];
  if(begin!=='\''&&begin!=='\"')return;
  env.index++;
  while(env.index<env.length){
    if(env.code[env.index]==='\\')env.index++;
    if(env.code[env.index]===begin)break;
    result.push(env.code[env.index]);
    env.index++;
  }
  env.index++;
  return result.join('');
}
/**
 * 获得一个数字
 */
env.getNumber=function(){
  let now=env.code.slice(env.index);
  let match=now.match(/^[\d.\-+]+/);
  let num=Number(match[0]);
  if(!(num<Infinity))console.error('compile error');
  env.index+=match[0].length;
  return num;
}
/**
   * 获得一个比较表达式
   */
env.getExpression=function(){
  let string=env.getString();
  let left=env.parseRightvalue(string);
  string=left.next;
  left=left.result;
  let sign=string.match(/^[!=<>]+/)[0];
  let right=env.parseRightvalue(string.slice(sign.length)).result;
  return {left,sign,right};
}
export default env;