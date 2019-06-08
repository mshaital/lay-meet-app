/**
 * Created by dell on 2018/1/9.
 */
/* eslint-disable */

// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connection.openUri('mongodb://localhost/gezhigang')

// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))
/* ************* 定义模式loginSchema ************* */
const loginSchema = mongoose.Schema({
  user_id: String,
  account: String,
  password: String,
  email: String,
  cell_phone_num: String,
  nick: String,
  register_date: String,
  birthday: Date,
  head_img: {type: String, default: ''},
  bg_img: {type: String, default: ''},
  sex: {type: String, default: 'S'},
  declaration: {type: String, default: '这家伙很懒没有留下什么'},
  login_times: Array,
  dynamic: Array,
  follow: Array,
  author_focus: {type: Object, default: {a: 2}},
  bookmarks: Array,
  private_letter: Array,
  browse_record_article: {type: Array, default: new Array(50)},
  browse_record_user: {type: Array, default: new Array(50)},
  email_pass_code: String,
})

const articleSchema = mongoose.Schema({
  article_id: String,
  author_id: String,
  account: String,
  article_title: String,
  category: String,
  article_date: Date,
  privacy: Boolean,
  content: String,
  read_num: Number,
  likes: Number,
  comment: Array
})

const draftSchema = mongoose.Schema({
  article_id: String,
  author_id: String,
  account: String,
  article_title: String,
  category: String,
  article_date: Date,
  privacy: Boolean,
  content: String,
})

const featuredArticlesSchema = mongoose.Schema({
  title: String,
  classification: String,
  date: Date,
  content: String,
  comment: Array
})

const problemSchema = mongoose.Schema({
  id: String,
  date: Date,
  account: String,
  content: String,
  classIfication: String
})

const topicSchema = mongoose.Schema({
  id: String,
  date: Date,
  account: String,
  content: String,
  owner: String,
  classIfication: String
})

const routerSchema = mongoose.Schema({
  role: {type: String, default: 'admin'},
  router: {type: String, default: {path: '/Admin', name: 'Admin', component: (resolve) => require(['@/views/admin/Admin'], resolve)}}
})


/* ************* 定义模型Model ************* */
const Models = {
  Login: mongoose.model('Login', loginSchema),
  Article: mongoose.model('article', articleSchema),
  Draft: mongoose.model('draft', draftSchema),
  Problem: mongoose.model('Problem', problemSchema),
  Topic: mongoose.model('Topic', topicSchema),
  Router: mongoose.model('Router', routerSchema),
  featuredArticles: mongoose.model('featuredArticles', featuredArticlesSchema)
}

module.exports = Models
