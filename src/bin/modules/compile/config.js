let keywords={
  'load':'load',
  'choice':'choice',
  'choose':'choice',
  'ch':'ch',
  'if':'if',
  'else':'else',
  'elseif':'elseif',
  'set':'set',
  'record':'record',
  'block':'block',
  'voice':'voice',
  'render':'render',
  'break':'break',
  'wait':'wait'
};
import env from "./env";
env.keywords=keywords;
import compile from "./compile";
import application from "../../lib/buildup";
application.compile=compile;