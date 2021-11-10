import {Inst} from './inst'
interface CompileResult{
  //剧情脚本的主流程，（不属于剧情块的剧情）
  main:Inst[],
  //所有的剧情块，属性名为定义的剧情块的名称
  blocks:{
    [propName:string]:Inst[]
  }
}
export function compile(code:string):CompileResult;