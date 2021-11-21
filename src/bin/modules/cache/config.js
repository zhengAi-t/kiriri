//启用自动化构建，
//不启用可能造成模块启动时序错误，如果有自己的更好的方案，这个需要去掉
import application from '../../lib/buildup';
//配置默认500M内存缓存大小
let maxSize=500*1024*1024;
export default{
  maxSize,application
}