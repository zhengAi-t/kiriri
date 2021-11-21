import voice from "./voice";

//配置使用哪套语法标准，
//如果将来集成了很多，可以增加自动判断选择的逻辑
//但是肯定还是手动选择打包脚本的体积更小
import script from "./script0/index";
let module=voice.init({script});

export default module;