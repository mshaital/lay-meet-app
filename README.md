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

## 项目架构

* 项目说明：

```javascript
    类似于微博的移动端应用 建立之初是为了学习nodejs 后来工作之余也不断完善
    目前很多功能没有实现
    还没部署所以不能在线预览
    借鉴了部分微博的设计风格
    项目为业余之间编写功能尚不完善 有问题欢迎给我提issue
```

* 功能概览：

```javascript
 ├─登录/注册
 ├─首页内容列表
 │  ├─内容详情
 │  ├─内容修改
 │  └─发布内容
 ├─发现页内容列表
 │  ├─作者主页
 │  │  ├─添加备注 （尚未实现）
 │  │  └─关注作者
 │  └─内容详情
 ├─消息页
 │  ├─我的评论
 │  │  ├─收到的评论
 │  │  └─发出的评论
 │  ├─我的赞
 │  │  └─收到的赞
 │  ├─私信
 │  │  └─私信列表
 │  ├─@我（尚未实现）
 └─侧边栏功能
     ├─我的主页
     ├─我的赞
     ├─设置
     ├─草稿箱
     ├─浏览记录
     └─投诉建议
```

* 技术栈：

```javascript
    前端页面使用vue vue-cli搭建，css使用了部分bootstrap相关类
    登录方面使用token验证
    后台使用nodejs配合express
    数据库MongoDB
```

* 目录结构：

```javascript
     ├─public
     ├─serve
     │  ├─config
     │  │  └─config.js                      // 服务端项目全局变量缓存文件
     │  ├─utils
     │  │  └─jwtauth.js                     // token验证中间件
     │  │  └─Util.js                        // 工具类
     │  ├─api.js                             // 接口api文件
     │  ├─db.js                              // 数据库配置文件
     │  └─index.js                           // 后端服务总入口
     ├─src
     │  ├─assets                             // 静态资源
     │  │  └─css
     │  │  └─img
     │  ├─components                         // vue公共组件
     │  ├─config                             // 前端全局变量缓存文件
     │  ├─models                             // 封装功能方法
     │  │  └─managers
     │  │  └─services
     │  │  └─utils
     │  ├─router                             // 路由
     │  ├─store                              // vuex文件
     │  ├─views                              // 页面文件
     │  ├─App.vue
     │  ├─main.js
     │  └─views
     ├─.gitignore
     ├─babel.config.js
     ├─package.json
     ├─README.md
     ├─todolist.md
     └─vue.config.js
```

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

    2019/5/31
    增加夜间模式

    2019/6/5
    增加图片存储服务器（感谢七牛云提供免费对象存储服务器）
    增加可以更改头像
    增加文章上传图片（最多可传9张）