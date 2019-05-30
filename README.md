# lay-meet-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 项目说明：
    一个微博类移动端项目可以实现登录注册 发表文章、发表评论、添加收藏、管理员管理等基本功能，项目为业余之间编写功能尚不完善 有问题欢迎指正。
    借鉴了部分微博的设计风格
    技术说明：
    前端页面使用vue vue-cli搭建，css使用了部分bootstrap相关类
    登录方面使用token验证
    后台使用nodejs配合express
    数据库MongoDB

## 文件结构：
    config 配置文件
    serve
      config
        config.js 服务端项目全局变量缓存文件
      utils
        jwtauth.js token验证中间件
        Util.js 工具类
      api.js 接口api文件
      db.js 数据库配置文件
      index.js 后端服务总入口
    src
      assets
        css css文件
        img 图片
      components vue公共组件
      config 前端全局变量缓存文件
      models
        managers 统一封装axios
        services 统一封装axios对外暴露方法
        utils 工具类
      router 路由
      store vuex文件
      views 页面文件
      App.vue
      main.js
      static
      test
      .babelrc
      .editorconfig
      .eslintignore
      .eslintrc.js
      .gitignore
      .postcssrc.js
      index.html
      package.json
      README.md
      todolist.md
      yarn-error.log


## 更新记录
    2018/11/21
    增加我的动态功能
    增加广场文章分页功能
    实现关注作者

    2018/11/22
    更改请求中token位置
    添加路由元信息
    增加用户信息统一管理

    2018/11/23
    增加动态分页显示
    增加个人信息页面我的评论显示
    增加作者信息页

    2018/11/29
    加入vuex

    2019/04/12
    页面重构开始改为面向移动端

    2019/04/23
    页面重构完成
    开始完善评论关注系统

    2019/5/28
    评论系统完成
    点赞系统完成
    私信系统完成
    草稿系统完成
    开始完善浏览记录
