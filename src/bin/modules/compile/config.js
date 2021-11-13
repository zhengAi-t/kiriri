let keywords={
  'load':'load',
  '加载':'load',
  'choice':'choice',
  '选择':'choice',
  'choose':'choice',
  'ch':'ch',
  '选项':'ch',
  'if':'if',
  '如果':'if',
  'else':'else',
  '否则':'else',
  'elseif':'elseif',
  '否则如果':'elseif',
  'set':'set',
  '设置':'set',
  '设定':'set',
  'record':'record',
  '记录':'record',
  'block':'block',
  '块':'block',
  'voice':'voice',
  '声音':'voice',
  'render':'render',
  '渲染':'render',
  'break':'break',
  '中断':'break',
  'wait':'wait',
  '等待':'wait',
};
import env from "./env";
env.keywords=keywords;
import compile from "./compile";
import application from "../../lib/buildup";
application.compile=compile;