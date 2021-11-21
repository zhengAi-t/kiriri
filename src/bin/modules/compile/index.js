import env from "./env";
import './insts/index';
let mudules={
  compile:env.compileMain
}
import application from "../buildup";
application.compile=mudules;
export default mudules;