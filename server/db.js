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
  nick: String,
  register_date: String,
  birthday: Date,
  head_img: {type: String, default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABOCAMAAACAE2F0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjQ4ODY0NzE2NzIyMTFFOUI4OEY4ODY4RUZBNzA0MTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjQ4ODY0NzI2NzIyMTFFOUI4OEY4ODY4RUZBNzA0MTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNDg4NjQ2RjY3MjIxMUU5Qjg4Rjg4NjhFRkE3MDQxOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNDg4NjQ3MDY3MjIxMUU5Qjg4Rjg4NjhFRkE3MDQxOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhtxsFgAAAIuUExURQHJvv///wGz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'},
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
  Router: mongoose.model('Router', routerSchema),
  featuredArticles: mongoose.model('featuredArticles', featuredArticlesSchema)
}

module.exports = Models
