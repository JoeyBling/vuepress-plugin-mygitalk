import * as config from "../package.json"

export default ({
  Vue
}) => {
  // 自定义扩展参数
  Vue.prototype.$myGitalkAppName = config.name;
  Vue.prototype.$myGitalkAppUrl = config.homepage;
  Vue.prototype.$myGitalkAppDescription = config.description;

}
