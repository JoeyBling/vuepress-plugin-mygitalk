const path = require('path')

// 实现深拷贝
const _ = require('lodash');
// 默认插件配置
const defaultPluginConfig = require('./default_plugin_config');

// 自定义插件实现
module.exports = (options = {}, context) => ({
  /* 插件的名称 */
  name: defaultPluginConfig.pluginName,

  /* 在应用初始化之后，并在某些特定的函数式 API 执行之前执行 */
  async ready() {
    // Object.assign函数为浅拷贝|lodash深拷贝
    options = _.defaultsDeep({}, options, defaultPluginConfig);
  },

  define() {
    if (options.log && options.enable) {
      console.log && console.log("加载" + options.pluginName +
        "插件配置：" + (JSON.stringify ? JSON.stringify(options) : options));
    }
    return {
      pluginConfig: JSON.stringify(options)
    };
  },

  /* 指向增强文件的绝对文件路径或返回该路径的函数 */
  enhanceAppFiles: [
    path.resolve(__dirname, './libs/enhanceAppFile.js')
  ],

  /* 指向 mixin 文件的路径，它让你可以控制根组件的生命周期 */
  clientRootMixin: path.resolve(__dirname, './libs/clientRootMixin.js'),

  /* 全局 UI Vue 组件 */
  globalUIComponents: ['Gitalk'],

  /* 在生产环境的构建结束后被调用，生成的页面的路径数组将作为该函数的第一个参数 */
  async generated() {

  },
});
