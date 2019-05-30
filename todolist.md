1 登录次数 （功能）
2 个人文章总数 （功能）
3 他人文章总数 （功能）
4 @功能 （功能）
5 上次登录时间 （功能）
6 限制重复注册账号用户名 （bug）
7 限制首页不能回退 （bug）
8 浏览记录不能实时更新，需要重新登录才能更新 （bug）
9 我的赞页面不能进入 （bug）
10 升级vue-cli3
11 建立图片服务器
12 关注账号备注系统
13 限制双击放大（bug）
 config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias.set('~models', resolve('src/models'))
    config.resolve.alias.set('~utils', resolve('src/models/utils'))
    config.resolve.alias.set('~components', resolve('src/components'))
    config.resolve.alias.set('~modules', resolve('src/models/services/modules'))
    config.resolve.alias.set('~config', resolve('src/config'))
    config.resolve.alias.set('~views', resolve('src/views'))