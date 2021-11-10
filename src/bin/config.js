//如果想要性能优化或者定制化，建议看一下模块里面的所有配置文件config.js

//选择启用哪些模块
import "./modules/core";
import './modules/compile'
import "./modules/file";
import "./modules/gesture";
import "./modules/render";
import "./modules/save";
import "./modules/ui";
import "./modules/voice";

//需要对外提供的所有工具函数
let config={};

import core from "./modules/core";
config.start=()=>core.event.emit('GameStart');

export default config;