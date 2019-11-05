<template></template>

<script>
import Gitalk from "gitalk";
import "gitalk/dist/gitalk.css";
import "../styles/gitalk-plus.styl";

// mixin.js
export default {
  computed: {
    pluginConfig() {
      return JSON.parse ? JSON.parse(pluginConfig) : pluginConfig;
    },
    data() {
      return {
        // 渲染的DOM元素id(使用)
        elementName: this.pluginConfig.elementName,
        // 最大重试次数
        maxRetryCount: this.pluginConfig.maxRetryCount,
        // 500毫秒执行一次check
        defaultCheckMinutes: this.pluginConfig.defaultCheckMinutes
      };
    }
  },
  created() {},
  created() {},
  mounted() {
    if (!this.pluginConfig.enable) {
      return;
    }
    // 打印插件信息
    this.plugin_log(
      this.$myGitalkAppDescription +
        " ➡️ " +
        this.$myGitalkAppName +
        " ➡️ " +
        this.$myGitalkAppUrl
    );
    //console.log("1" + document.querySelector(".theme-container"));
    /** 初始化Gitalk */
    /* this.$nextTick(function() {
      console.log(document.querySelector(".page"));
      this.initGitalk(this.$route);
    }); */
    this.$nextTick(() => {
      // .page 里的Dom元素会重新加载2次，暂时没找到解决办法，只能延缓Gitalk执行
      setTimeout(() => {
        this.initGitalk(this.$route);
      }, 2000);
      //console.log(document.querySelector(".page"));
    });
    /* this.$router.beforeEach((to, from,next) => {
      console.log("3" + document.querySelector(".theme-container"));
      next();
    }); */
    // 监听,当路由发生变化的时候执行
    this.$router.afterEach((to, from) => {
      this.$nextTick(function() {
        //页面Dom加载完成后执行
        if (to.path != from.path) {
          // console.log(to.path)
          this.initGitalk(to);
        }
      });
    });
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    /* $route: {
      handler: function (to, from) {
        this.$nextTick(function () { //页面加载完成后执行
          console.log(location.href);
          console.log(document.querySelector('.page'));
        })
      },
      // 深度观察监听
      deep: true
    } */
  },
  updated() {},
  methods: {
    /* mounted:html加载完成后执行。执行顺序：子组件-父组件 */
    /** 初始化Gitalk，因为组件加载顺序问题，第一次获取不到.page DOM元素.
      暂时用setInterval函数解决. */
    /**
     * 延时触发初始化Gitalk
     */
    initGitalk(route) {
      let pageElem = document.querySelector(".page");
      // let pageElem = document.querySelector(".page");
      // let pageElem = document.querySelector("#id");
      console.debug(this.$myGitalkAppName + ">>>>initGitalk");
      if (!pageElem) {
        let retryCount = 0;
        // 500毫秒执行一次check(() => 解决setTimeout、setInterval内this调用失效的解决办法)
        // https://blog.csdn.net/aiyawei123/article/details/81867304
        const timerCheckElem = setInterval(() => {
          // 超过最大重试次数，直接退出
          if (retryCount >= this.data.maxRetryCount) {
            // 清除定时器
            clearInterval(timerCheckElem);
            return;
          }
          // 递增重试次数
          retryCount++;
          if (
            this.pluginConfig.home &&
            this.$page.frontmatter &&
            this.$page.frontmatter.home
          ) {
            // 首页添加评论
            let appElem = document.querySelector(".theme-container");
            if (appElem) {
              clearInterval(timerCheckElem);
              this.loadGitalk(route, appElem);
            }
          } else {
            //console.log("Gitalk check Dom()")
            pageElem = document.querySelector(".page");
            if (pageElem) {
              clearInterval(timerCheckElem);
              this.loadGitalk(route, pageElem);
            }
          }
        }, this.data.defaultCheckMinutes);
      } else {
        this.loadGitalk(route, pageElem);
      }
    },
    /**
     * 加载Gitalk
     * @param {*} to
     */
    loadGitalk(to, elem) {
      let commentsContainer = document.getElementById(this.data.elementName);
      if (!commentsContainer) {
        commentsContainer = document.createElement("div");
        commentsContainer.id = this.data.elementName;
        commentsContainer.classList &&
          commentsContainer.classList.add("content");
      } else {
        // 清空DOM元素
        commentsContainer.innerHTML = "";
      }
      const $page = !!elem ? elem : document.querySelector(".page");
      //const $page = document.querySelector('.page');
      if ($page) {
        // FIXME (.page)第一次进入由于会刷新二次，所以第一次不显示
        $page.appendChild(commentsContainer);
        if (typeof Gitalk !== "undefined" && Gitalk instanceof Function) {
          // FIXME Gitalk获取到的title是上一个页面的title，暂时这样解决
          if (window && window.document) {
            // 因为组件加载顺序问题，先执行的子组件。执行顺序：子组件-父组件
            // @see packages\@vuepress\core\lib\client\root-mixins\updateMeta.js
            // 最好别调用this.updateMeta() 只是为了让Gitalk能获取到实时`document.title`而已
            // @see file `node_modules\gitalk\dist\gitalk.js`,code `_this.options =`
            //this.updateMeta()
            window.document.title = this.$title;
            //console.log(window.document.title);
            //window.document.title = this.$page.title;
            // @see packages\@vuepress\core\lib\node\ClientComputedMixin.js
            //console.log(this.$title);
          }
          // to.fullPath
          //this.renderGitalk(this.$page.title || to.path);
          this.renderGitalk(this.$title || this.$page.title || to.path);
        }
      }
    },
    /**
     * 渲染Gitalk
     * @param {*} gitalkId
     */
    renderGitalk(gitalkId) {
      //console.log(gitalkId)
      // Name is too long (maximum is 50 characters)
      if (typeof document === "string") {
        gitalkId = gitalkId.length > 50 ? gitalkId.substr(0, 50) : gitalkId;
      }
      const gitalk = new Gitalk({
        clientID: this.pluginConfig.gitalk.clientID,
        // come from github development
        clientSecret: this.pluginConfig.gitalk.clientSecret,
        repo: this.pluginConfig.gitalk.repo,
        owner: this.pluginConfig.gitalk.owner,
        admin: [this.pluginConfig.gitalk.owner],
        id: gitalkId, // Ensure uniqueness and length less than 50
        distractionFreeMode: false, // Facebook-like distraction free mode
        language: !!this.pluginConfig.gitalk.language
          ? this.pluginConfig.gitalk.language
          : "zh-CN"
      });
      // console.log(gitalk)
      //console.log(window.document.title)
      gitalk.render(this.data.elementName);
    },
    // 统一输出日志
    plugin_log(str = this.pluginConfig.pluginName) {
      if (this.pluginConfig.log) {
        console.log && console.log(str);
      }
    }
  }
};
</script>
<style lang="stylus"></style>