import renderVersion from './script0/index';
import Render from './render';
let render=Render.init({render:renderVersion});


import application from "../../lib/buildup";
application.render=render;


export default render;