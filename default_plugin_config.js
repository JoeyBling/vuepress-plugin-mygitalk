const config = require('./package.json');

/* 全局默认配置(插件定义的常量) */
module.exports = {
  // 全局开启是否打印控制台日志
  log: true,
  // 插件名称
  pluginName: config.name,
  // 是否启用(关闭请设置为false)(default: true)
  enable: true,

  // 默认插件配置(此处插件配置可更改)

  // 渲染的DOM元素id
  elementName: "my-gitalk-container",
  // 最大重试次数
  maxRetryCount: 5,
  // 500毫秒执行一次check
  defaultCheckMinutes: 500,
  // 是否开启首页评论
  home: true,
  // Gitalk配置
  gitalk: {
    // clientID: '',
    // // come from github development
    // clientSecret: '',
    // repo: '',
    // owner: '',
    language: 'zh-CN',
  },

};
