// .vuepress/config.js
module.exports = {
  /* 使用插件 */
  plugins: [
    [
      require('../../vuepress-plugin-mygitalk/index'), {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 日志启用(调试用)(default: true)
        log: true,
        // 是否开启首页评论(default: true)
        home: true,
        // Gitalk配置
        gitalk: {
          // GitHub Application Client ID.
          clientID: '071b084546d9f5bd6306',
          // GitHub Application Client Secret.
          clientSecret: 'a19c22f6b78dd87a731a192afca81cf63e57c5d5',
          // GitHub repository. 存储评论的 repo
          repo: 'ibooks',
          // GitHub repository 所有者，可以是个人或者组织。
          owner: 'JoeyBling',
          // 设置语言(default: zh-CN)
          language: 'zh-CN',
        }
      }
    ],
  ],
  themeConfig: {
    nav: [{
      text: 'Home',
      link: '/'
    }],
  },
}
