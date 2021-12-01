/**
 * 编译代码,
 * bug:
 * 编译put指令时没有对属性值分类，
 * 可能造成值解析不准确或者值的类型出错
 */
import config from './config';
let keywords=config.keywords;
function compile(code){
  let index=0,length=code.length,content=[];
  /**
   * 跳过空白
   */
  function ignoreBlank(){
    let match=code.slice(index).match(/^[\r\n\s]+/);
    if(match)index+=match[0].length;
  }
  /**
   * 跳过注释
   */
  function ignoreComments(){
    while(code[index]==='/'&&code[index+1]==='/'){
      index+=2;
      let match=code.slice(index).match(/^[^\r\n]*/);
      index+=match[0].length;
      ignoreBlank();
    }
  }
  let convertKeyword=word=>keywords[word];
  let isNumber=code=>code>47&&code<58;
  let isCharL=code=>code>96&&code<123;
  let isCharU=code=>code>64&&code<91;
  let isChar=code=>isCharL(code)||isCharU(code);
  let isOthers=code=>code>127;
  let isKeywordChar=code=>isNumber(code)||
    isChar(code)||isOthers(code);
  function getKeyword(){
    ignoreBlank();
    let result=[];
    while(index<length){
      let keycode=code.charCodeAt(index);
      if(!isKeywordChar(keycode))break;
      result.push(code[index++]);
    }
    let keyword=result.join('');
    if(!convertKeyword(keyword)){
      console.error('unknown keyword',keyword);
    }
    return convertKeyword(keyword);
  }
  let parsers={};
  function getString(){
    let token=code[index];
    if(token!=='\''&&token!=="\"")return;
    index++;
    let result=[];
    while(index<length){
      if(code[index]===token)break;
      if(code[index]==='\\')index++;
      result.push(code[index++]);
    }
    index++;
    return result.join('');
  }
  function getAnyValue(){
    ignoreBlank();
    let result=[];
    while(index<length){
      let char=code[index];
      if(char.match(/[;\s\n]/))break;
      if(char==='\r'&&code[index+1]==='\n')break;
      result.push(code[index++]);
    }
    let match=result.join('');
    let num=Number(match);
    return num<Infinity?num:match;
  }
  parsers.put=function(){
    ignoreBlank();
    let keyword=getKeyword();
    ignoreBlank();
    let result={opt:'put',type:keyword};
    while(index<length){
      let keyword=getKeyword();
      ignoreBlank();
      index++;
      ignoreBlank();
      let value=getString()||getAnyValue();
      ignoreBlank();
      result[keyword]=value;
      if(keyword===undefined)console.error('compile error');
      if(code[index]===';')break;
    }
    content.push(result);
    index++;
  }
  let setParas={};
  setParas.id=getAnyValue;
  setParas.mix=getAnyValue;
  setParas.tween=getAnyValue;
  setParas.ease=getTime;
  setParas.delay=getTime;
  setParas.rotate=getRadPair;
  setParas.width=getNumberPair;
  setParas.height=getNumberPair;
  setParas.x=getNumberPair;
  setParas.y=getNumberPair;
  setParas.alpha=getNumberPair;
  setParas.zindex=getNumber;
  setParas.text=getString;
  setParas.fontSize=getAnyValue;
  setParas.mask=getAnyValue;
  function ignoreSpace(){
    let match=code.slice(index).match(/^[ \f\r\t\v]+/);
    if(match)index+=match[0].length;
  }
  function getNumberPair(){
    let num0=getNumber();
    ignoreSpace();
    let testPrefer=code.slice(index).match(/^[a-zA-Z]+/);
    if(!testPrefer||testPrefer[0]!=='to')return {to:num0};
    index+=2;
    ignoreSpace();
    let num1=getNumber();
    return {from:num0,to:num1};
  }
  function getRadPair(){
    let rad0=getRad();
    ignoreBlank();
    let rollback=index;
    let keyword=getKeyword();
    if(keyword!=='to'){
      index=rollback;
      return {to:rad0};
    }
    let rad1=getRad();
    return {from:rad0,to:rad1};
  }
  function getRad(){
    ignoreBlank();
    let num=getNumber();
    let rollback=index;
    let keyword=getKeyword();
    if(keyword!=='rad')index=rollback;
    return num;
  }
  function getTime(){
    ignoreSpace();
    let num=getNumber();
    ignoreSpace();
    let testStr=code.slice(index).match(/^[a-zA-Z]+/);
    if(!testStr)return num;
    if(testStr[0]==='s')num*=1000,index++;
    else if(testStr[0]==='ms')index+=2;
    return num;
  }
  function getNumber(){
    ignoreBlank();
    let match=code.slice(index).match(/^[\d.\-\+]+/);
    if(!match)return;
    let num=Number(match[0]);
    if(!(num<Infinity))return;
    index+=match[0].length;
    return num;
  }
  parsers.set=function(){
    let result={opt:'set'};
    while(index<length){
      ignoreBlank();
      let keyword=getKeyword();
      ignoreBlank();
      index++;
      ignoreBlank();
      let parasFunction=setParas[keyword];
      if(!parasFunction)console.error('compile error ',keyword);
      let paras=parasFunction();
      ignoreBlank();
      result[keyword]=paras;
      if(keyword===undefined)console.error('compile error');
      if(code[index]===';')break;
    }
    content.push(result);
    index++;
  }
  parsers.clear=function(){
    let result={opt:'clear'};
    ignoreBlank();
    while(index<length){
      let keyword=getKeyword();
      ignoreBlank();
      index++;
      let value=getAnyValue();
      result[keyword]=value;
      ignoreBlank();
      if(code[index]===';')break;
    }
    content.push(result);
    index++;
  }
  parsers.hand=function(){
    ignoreBlank();
    let stack=0,start=index;
    while(index<length){
      if(code[index]==='{')stack++;
      else if(code[index]==='}')stack--;
      if(stack===0)break;
      if(code[index]==='\\')index++;
      index++;
    }
    let code_=code.slice(start+1,index);
    index++;
    ignoreBlank();
    index++;
    content.push({opt:'hand',code:code_});
  }
  while(index<length){
    ignoreBlank();
    ignoreComments();
    ignoreBlank();
    if(index>=length)break;
    let keyword=getKeyword();
    if(parsers[keyword])parsers[keyword]();
    else if(typeof keyword!=='undefined'||(keyword===undefined&&index!==length)){
      console.error('compile error',code.slice(index),content);
      break;
    } 
  }
  return content;
}
export default{
  compile
}