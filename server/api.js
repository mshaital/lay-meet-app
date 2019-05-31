/**
 * Author: neel
 * Date: 2018.1.9
 * Version: 1.3.3
 * Description: 接口api
 * History:
 * Others:
 **/

'use strict'
/* eslint-disable */

const models = require('./db')
const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const config = require('./config/config')
const moment = require('moment')
const app = express()
const jwtauth = require('./utils/jwtauth')
const xss = require('xss')
const Util = require('./utils/Util')
const uuid = require('uuid')




app.set('jwtTokenSecret', config.jwtTokenSecret)

router.use((req, res, next) => {
  console.log('=========================' + req.url + '=========================')
  next()
})

/**
 * @description 创建用户
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/login/userRegister', (req, res, next) => {
  let user_id = uuid.v1();
  let newAccount = new models.Login({
    user_id: user_id,
    account: req.body.userName,
    password: req.body.userPass,
    sex: req.body.sex,
    birthday: req.body.birthday,
    register_date: (new Date()).valueOf(),
  })
  newAccount.save((err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: config.RES_DATA_MSG.SUCCESS_MSG, code: config.RES_DATA_CODE.SUCCESS_CODE})

  })
})

/**
 * @description 登录
 * @param {String} userName 账号
 * @param {String} userPass 密码
 * @return {Object} data 用户信息
 */
router.post('/api/login/getAccount', (req, res, next) => {
  // console.log('getAccount')
  let userName = req.body.userName
  let userPass = req.body.userPass
  models.Login.findOne(
    {account: userName, password: userPass},
    {password: 0, dynamic: 0, private_letter: 0},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }

      if (data === '' || data === undefined || data === null) {
        next(RES_MSE.FAIL_MSG_ERROR, config.RES_DATA_MSG.FAIL_MSG, config.RES_DATA_CODE.FAIL_CODE)
      } else {
        data.isLogin = true
        let expires = moment().add(7, 'days').valueOf()
        let token = jwt.encode({iss: data.user_id, exp: expires}, app.get('jwtTokenSecret'))
        let datas = {
          token: token,
          user: data.toJSON()
        }
        next({message: config.RES_MSE.SUCCESS_MSG, data: datas, code: config.RES_DATA_CODE.SUCCESS_CODE})

      }
    })
})


/**
 * @description 按user_id查询用户信息列表 （公开）（查询浏览记录）
 * @param {String} authorId 用户ID
 * @return {Object} data 用户信息
 */
router.post('/api/login/getAuthorListById', [jwtauth], (req, res, next) => {
  console.log('getAuthorListById')
  let authorIds = req.body.authorIds
  let skip = req.body.skip

  models.Login.aggregate(
    {
      $project: {
        user_id: 1,
        account: 1,
        nick: 1,
        head_img: 1,
      }
    },
    {$match: {user_id: {$in: authorIds}}},
    {$skip: skip},
    {$limit: config.limit},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})
    })

})

/**
 * @description 查询用户信息 （公开）（作者页面）
 * @param {String} authorId 用户ID
 * @return {Object} data 用户信息
 */
router.post('/api/login/getAuthorInfo', [Util.getToken()], (req, res, next) => {
  // console.log('getAuthorInfo')
  let authorId = req.body.authorId
  let userId = req.userId

  models.Login.findOne(
    {user_id: authorId},
    {
      user_id: 1,
      account: 1,
      date: 1,
      sex: 1,
      declaration: 1,
      nick: 1,
      head_img: 1,
      author_focus: 1,
      follow: 1,
      bookmarks: 1,
    },
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})
    })


  if(userId) {
    models.Login.update({'user_id': userId}, {$addToSet: {'browse_record_user': authorId}}, (err, data) => {})
    models.Login.update({'user_id': userId}, {$pop:{"browse_record_user": -1}}, (err, data) => {})
  }
})

/**
 * @description 修改用户信息
 * @param {String} authorId 用户ID
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/user/check/userInfoModify', [jwtauth], (req, res, next) => {
  // console.log('user_id')

  let nick = req.body.nick
  let sex = req.body.sex
  let declaration = req.body.declaration

  models.Login.update({'user_id': req.userId}, {
    '$set': {
      'nick': nick,
      'sex': sex,
      'declaration': declaration
    }
  }, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })

  })
  let dynamicInfo = '修改了个人信息 '
  Util.saveDynamic(req.userId, dynamicInfo)
})

/**
 * @description 用户头像上传
 * @param {String} userHeadImg 用户头像base64
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/user/userModifyHeadImg', [jwtauth], (req, res, next) => {
  // console.log('userModifyHead')
  let userHeadImg = req.body.userHeadImg
  let userId = req.userId
  models.Login.update({'user_id': userId}, {'$set': {head_img: userHeadImg}}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })

  })
  let dynamicInfo = '修改了头像 '
  Util.saveDynamic(req.userId, dynamicInfo)
})

/**
 * @description 用户创建文章
 * @param {Object} 文章信息
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/blog/check/createArticle', [jwtauth], (req, res, next) => {
  // console.log('createArticle')
  let Article = new models.Article({
    article_id: req.userId + uuid.v1(),
    author_id: req.body.authorId,
    account: req.body.account,
    article_title: req.body.articleTitle,
    category: req.body.category,
    article_date: req.body.articleDate,
    privacy: req.body.privacy,
    content: req.body.content,
    read_num: 0,
    likes: 0,
    comment: []
  })
  Article.save((err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })

  })

  let dynamicInfo = '创建了文章 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle, req.body.privacy)
})

/**
 * @description 用户文章详情
 * @param {String} articleId 作者ID
 * @return {Object} data 文章详情
 */
router.post('/api/blog/check/getArticle', [jwtauth], (req, res, next) => {
  // console.log('getArticle')

  let articleId = req.body.articleId
  models.Article.findOne({article_id: articleId}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

  })
})


/**
 * @description 用户创建文章草稿
 * @param {Object} 文章信息
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/blog/check/createArticleDraft', [jwtauth], (req, res, next) => {
  // console.log('createArticle')
  let Draft = new models.Draft({
    article_id: req.userId + uuid.v1(),
    author_id: req.body.authorId,
    account: req.body.account,
    article_title: req.body.articleTitle,
    category: req.body.category,
    article_date: req.body.articleDate,
    privacy: req.body.privacy,
    content: req.body.content,
    draft: true,
  })
  Draft.save((err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })
  })

  // let dynamicInfo = '创建了文章 '
  // Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle, req.body.privacy)
})

/**
 * @description 用户文章草稿更新
 * @param {Object} 文章详情
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/blog/updataArticleDraft', [jwtauth], (req, res, next) => {
  // console.log('updateArticle')
  let articleTitle = req.body.article_title
  let category = req.body.category
  let articleDate = req.body.article_date
  let privacy = req.body.privacy
  let content = req.body.content
  let articleId = req.body.article_id
  console.log(category)
  models.Draft.update(
    {'article_id': articleId},
    {
      $set: {
        'article_title': articleTitle,
        'category': category,
        'article_date': articleDate,
        'privacy': privacy,
        'content': content
      }
    },
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({
        message: config.RES_MSE.SUCCESS_MSG,
        data: config.RES_DATA_MSG.SUCCESS_MSG,
        code: config.RES_DATA_CODE.SUCCESS_CODE
      })

    })
  let dynamicInfo = '更新了文章 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})

/**
 * @description 用户文章草稿列表
 * @param {String} authorId 作者ID {String} skip 返回数量
 * @return {Array} data 文章列表
 */
router.get('/api/blog/check/getArticleDraftList', [Util.getToken()], (req, res, next) => {
  // console.log('getArticleList')
  let skip = parseInt(req.query.skip)
  let userId = req.userId
  models.Draft.aggregate({
      $match: {author_id: userId}
    },
    {$sort: {'article_date': -1}},
    {$skip: skip},
    {$limit: config.limit},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

    })
})


/**
 * @description 查找用户文章草稿详情
 * @param {String} articleId 作者ID
 * @return {Object} data 文章详情
 */
router.post('/api/blog/check/getArticleDraft', [jwtauth], (req, res, next) => {
  // console.log('getArticle')

  let articleId = req.body.articleId
  models.Article.findOne({article_id: articleId}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

  })
})

/**
 * @description 用户文章删除
 * @param {String} articleId 作者ID
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/blog/check/deleteArticle', [jwtauth], (req, res, next) => {
  // console.log('deleteArticle')
  let articleId = req.body.articleId
  models.Article.remove({article_id: articleId}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

  })
  let dynamicInfo = '删除了文章 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})

/**
 * @description 用户文章更新
 * @param {Object} 文章详情
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/blog/check/updateArticle', [jwtauth], (req, res, next) => {
  // console.log('updateArticle')
  let articleTitle = req.body.articleForm.articleTitle
  let category = req.body.articleForm.category
  let articleDate = req.body.articleForm.articleDate
  let privacy = req.body.articleForm.privacy
  let content = req.body.articleForm.content
  let articleId = req.body.articleForm.articleId
  models.Article.update(
    {'article_id': articleId},
    {
      $set: {
        'article_title': articleTitle,
        'category': category,
        'article_date': articleDate,
        'privacy': privacy,
        'content': content
      }
    },
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({
        message: config.RES_MSE.SUCCESS_MSG,
        data: config.RES_DATA_MSG.SUCCESS_MSG,
        code: config.RES_DATA_CODE.SUCCESS_CODE
      })

    })
  let dynamicInfo = '更新了文章 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})

/**
 * @description 查询所有文章 （公开）
 * @param {String} skip 返回数量
 * @return {Array} data
 */
router.post('/api/blog/getAllArticle', (req, res, next) => {
  // console.log('getAllArticle')
  let skip = parseInt(req.body.skip)
  models.Article.aggregate(
    {
      $lookup: { // 左连接
        from: 'logins', // 关联到Login表
        localField: 'author_id', // article 表关联的字段
        foreignField: 'user_id', // user 表关联的字段
        as: 'user'
      }
    },
    {$match: {privacy: false}},
    {$sort: {'article_date': -1}},
    {$replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$user', 0]}, '$$ROOT']}}},

    {
      $addFields: {
        comment_count: {$sum: '$comment'}
      }
    },
    {
      $project: {
        head_img: 1,
        account: 1,
        title: 1,
        author_id: 1,
        article_id: 1,
        classification: 1,
        date: 1,
        content: 1,
        read_num: 1,
        comment_count: 1
      }
    },
    {$skip: skip},
    {$limit: config.limit},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

    })
})

/**
 * @description 查询文章详情与作者信息 （公开）
 * @param {String} skip 返回数量
 * @return {Object} data
 */
router.post('/api/blog/getArticleDetailsAndAuthorInfo', (req, res, next) => {
  // console.log('getArticleDetailsAndAuthorInfo')
  let articleId = req.body.articleId

  models.Article.aggregate({
      $lookup: { // 左连接
        from: 'logins', // 关联到Login表
        localField: 'author_id', // article 表关联的字段
        foreignField: 'user_id', // user 表关联的字段
        as: 'user'
      }
    },
    {$match: {'article_id': articleId}},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }

      let resData = data[0]
      resData.user = resData.user[0]
      next({message: config.RES_MSE.SUCCESS_MSG, data: resData, code: config.RES_DATA_CODE.SUCCESS_CODE})

    })
})

/**
 * @description 创建评论
 * @param {String} comment 评论内容
 * @param {String} date 创建时间
 * @param {String} userAccount 评论人账号
 * @param {String} userId 评论人ID
 * @param {String} articleId 文章ID
 * @return {Array} data
 */
router.post('/api/blog/check/createComment', [jwtauth], (req, res, next) => {
  // console.log('createComment')
  let comment = {
    comment: req.body.comment,
    date: req.body.date,
    userAccount: req.body.userAccount,
    userId: req.body.userId
  }
  let articleId = req.body.articleId

  models.Article.update({article_id: articleId}, {$push: {'comment': comment}}, {upsert: true}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

  })
  let dynamicInfo = '评论了文章 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})

/**
 * @description 查询我的评论 （全部）
 * @param {String} skip 返回数量
 * @return {Array} data
 */
router.get('/api/blog/getMyComment', [jwtauth], (req, res, next) => {
  // console.log('getUserComment')
  let userId = req.userId
  let skip = parseInt(req.query.skip)
  // console.log(userId)

  models.Article.aggregate(
    {$unwind: '$comment'},
    {$match: {'comment.userId': userId}},
    {$sort: {'comment.date': -1}},
    {$skip: skip},
    {$limit: config.limit}, (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

    })
})

/**
 * @description 按作者id查询评论 （全部）
 * @param {String} skip 返回数量
 * @return {Array} data 评论
 */
router.get('/api/blog/getCommentByAuthorId', [jwtauth], (req, res, next) => {
  // console.log('getUserComment')
  let skip = parseInt(req.query.skip)
  let authorId = req.userId

  models.Article.aggregate(
    {$unwind: '$comment'},
    {$match: {'author_id': authorId}},
    {$sort: {'comment.date': -1}},
    {$skip: skip},
    {$limit: config.limit}, (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

    })
})


/**
 * @description  问题反馈
 * @param {String} userId 用户ID
 * @param {String} account 用户账号
 * @param {String} content 反馈内容
 * @param {String} classIfication 反馈类型
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/sys/check/saveComplaintSuggestion', [jwtauth], (req, res, next) => {
  // console.log('saveComplaintSuggestion')
  let problemCon = new models.Problem({
    user_id: req.body.userId,
    account: req.body.account,
    content: xss(req.body.content),
    date: new Date(),
    classIfication: req.body.classIfication
  })

  // 保存数据newAccount数据进mongoDB
  problemCon.save((err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })

  })
})

/**
 * @description 创建收藏
 * @param {String} skip 返回数量
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/user/check/createBookmarks', [jwtauth], (req, res, next) => {
  // console.log('createBookmarks')
  let articleId = req.body.articleId
  let authorId = req.body.authorId
  let userId = req.userId
  let bookmark = {
    article_id: articleId,
    author_id: authorId,
    create_date: new Date(),
  }

  models.Login.update({user_id: userId}, {$push: {bookmarks: bookmark}}, {upsert: true}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    if (data.nModified === 0) {
      next({
        message: config.RES_MSE.FAIL_MSG_REPEAT,
        data: config.RES_DATA_MSG.FAIL_MSG,
        code: config.RES_DATA_CODE.SUCCESS_CODE
      })

    } else {
      next({
        message: config.RES_MSE.SUCCESS_MSG,
        data: config.RES_DATA_MSG.SUCCESS_MSG,
        code: config.RES_DATA_CODE.SUCCESS_CODE
      })

    }
  })

  let dynamicInfo = '收藏了文章 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})

/**
 * @description 删除收藏
 * @param {String} articleId 取消收藏文章的ID
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/user/check/deleteBookmarks', [jwtauth], (req, res, next) => {
  // console.log('deleteBookmarks')
  let articleId = req.body.articleId

  models.Login.update({user_id: req.userId}, {$pull: {bookmarks: articleId}}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })

  })

  let dynamicInfo = '取消收藏文章 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})

/**
 * @description 查询被收藏
 * @param {String} skip 跳过数量
 * @return {Array} data
 */
router.post('/api/user/check/getReceivedBookmarks', [jwtauth], (req, res, next) => {
  // console.log('getReceivedBookmarks')
  let userId = req.userId
  let skip = req.body.skip
  // console.log(userId)

  models.Login.aggregate(
    {$project: {'account': 1, 'user_id': 1, 'head_img': 1, 'nick': 1, 'bookmarks': 1}},
    {$unwind: '$bookmarks'},
    {$match: {'bookmarks.author_id': userId}},
    {
      $lookup: { // 左连接
        from: 'articles',
        localField: 'bookmarks.author_id', // Login 表关联的字段
        foreignField: 'author_id',
        as: 'article'
      }
    },
    {$sort: {'bookmarks.create_date': 1}},
    {$skip: skip},
    {$limit: config.limit},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

    })
})


/**
 * @description 查询收藏列表
 * @param {Array} bookmars 文章ID列表
 * @return {Array} data
 */
router.post('/api/blog/getBookmarkList', (req, res, next) => {
  // console.log('getBookmarkList')
  let bookmars = req.body.list
  models.Article.find({'article_id': {$in: bookmars}}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })

  })
})

/**
 * @description 阅读数量
 * @param {String} articleId 文章ID
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/blog/addReadNumber', [Util.getToken()], (req, res, next) => {
  // console.log('addReadNumber')
  let articleId = req.body.articleId
  // let userId = req.userId

  models.Article.update({'article_id': articleId}, {'$inc': {'read_num': 1}}, {upsert: true}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })
  })
  // if(userId) {
  //   models.Login.update({'user_id': userId}, {$addToSet: {'browse_record_article': articleId}}, (err, data) => {})
  //   models.Login.update({'user_id': userId}, {$pop:{"browse_record_article": -1}}, (err, data) => {})
  // }
})

/**
 * @description 查询动态
 * @param {String} account 账号
 * @param {String} skip 跳过数量
 * @return {Array} data
 */
router.get('/api/user/getUserDynamic', [Util.getToken()], (req, res, next) => {
  // console.log('getUserDynamic')
  let account = req.query.userAccount
  let userId = req.query.userId
  let skip = parseInt(req.query.skip)
  let loginUserId = (req.userId)
  let condition
  loginUserId === userId ? condition = {account: account} : condition = {account: account, 'dynamic.privacy': false}
  models.Login.aggregate(
    {$project: {'account': 1, 'head_img': 1, 'nick': 1, dynamic: '$dynamic'}},
    {$unwind: '$dynamic'},
    {$match: condition},
    {$sort: {'dynamic.time': -1}},
    {$skip: skip},
    {$limit: config.limit},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

    })
})

/**
 * @description 点赞
 * @param {String} articleId 文章ID
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/blog/likes', [jwtauth], (req, res, next) => {
  // console.log('likes')
  let articleId = req.body.articleId

  models.Article.update({'article_id': articleId}, {'$inc': {'likes': 1}}, {upsert: true}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({
      message: config.RES_MSE.SUCCESS_MSG,
      data: config.RES_DATA_MSG.SUCCESS_MSG,
      code: config.RES_DATA_CODE.SUCCESS_CODE
    })

  })
  // let dynamicInfo = '点赞文章 '
  // Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})


/**
 * @description 关注用户
 * @param {String} authorId 被关注ID userId 关注ID
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/user/check/userAuthorFollow', [jwtauth], (req, res, next) => {
  // console.log('userAuthorFollow')
  let authorId = req.body.authorId
  let userId = req.userId

  let promise = new Promise((resolve, reject) => {
    models.Login.update({'user_id': authorId}, {$addToSet: {'follow': userId}}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
  promise.then(() => {
    // 登录成功时处理
    // console.log('关注作者成功')

    let authorIdKey = 'author_focus.' + authorId
    models.Login.update({'user_id': userId}, {$set: {[authorIdKey]: ''}}, (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({
        message: config.RES_MSE.SUCCESS_MSG,
        data: config.RES_DATA_MSG.SUCCESS_MSG,
        code: config.RES_DATA_CODE.SUCCESS_CODE
      })

    })
  }).catch((e) => {
    // console.log('关注作者失败')
  })

  let dynamicInfo = '关注作者 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})

/**
 * @description 取消关注用户
 * @param {String} authorId 被取消关注ID userId 取消关注ID
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/user/check/userAuthorUnFollow', [jwtauth], (req, res, next) => {
  // console.log('userAuthorUnFollow')
  let authorId = req.body.authorId
  let userId = req.userId

  let promise = new Promise((resolve, reject) => {
    models.Login.update({'user_id': authorId}, {$pull: {'follow': userId}}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

  promise.then(() => {
    // 登录成功时处理
    // console.log('取消关注作者')
    let authorIdKey = 'author_focus.' + authorId
    models.Login.update({'user_id': userId}, {$unset: {[authorIdKey]: ''}}, (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({
        message: config.RES_MSE.SUCCESS_MSG,
        data: config.RES_DATA_MSG.SUCCESS_MSG,
        code: config.RES_DATA_CODE.SUCCESS_CODE
      })

    })
  }).catch((e) => {
    console.log('取消关注作者失败')
  })

  let dynamicInfo = '取消关注作者 '
  Util.saveDynamic(req.userId, dynamicInfo, req.body.articleTitle)
})

/**
 * @description 给被关注用户添加备注
 * @param {String} authorId 搜索的标题
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/user/check/addaAuthorFocusRemarks', [jwtauth], (req, res, next) => {
  // console.log('addaAuthorFocusRemarks')

  let authorId = req.body.authorId
  let userId = req.userId

  models.Login.update({'user_id': userId}, {$pull: {'author_focus': authorId}}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

  })
})

/**
 * 搜索文章 按标题
 * @param {String} searchValue 搜索的标题
 * @return {Object} 文章的详情
 */
router.post('/api/blog/searchArticleByTitle', (req, res, next) => {
  // console.log('searchArticleByTitle')

  let searchValue = req.body.searchValue
  models.Article.find({content: {$regex: searchValue}, privacy: false}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

  })
})

/**
 * 搜索文章 某个作者按标题
 * @param {String} searchValue 搜索的标题
 * @return {Array} 文章的列表
 */
router.post('/api/blog/searchAuthorArticleByTitle', (req, res, next) => {
  // console.log('searchAuthorArticleByTitle')

  let searchValue = req.body.searchValue
  let authorId = req.body.authorId
  models.Article.find({content: {$regex: searchValue}, privacy: false, author_id: authorId}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

  })
})

/**
 * 搜索文章 按作者（公开）
 * @param {String} searchValue 搜索的标题
 * @return {Array} 文章的详情
 */
router.post('/api/blog/getArticleListByAuthor', (req, res, next) => {

  let skip = parseInt(req.body.skip)
  let authorId = req.body.authorId

  models.Article.aggregate(
    {
      $lookup: { // 左连接
        from: 'logins', // 关联到Login表
        localField: 'author_id', // article 表关联的字段
        foreignField: 'user_id', // user 表关联的字段
        as: 'user'
      }
    },
    {$match: {author_id: {$in: authorId}, privacy: false}},
    {$sort: {'article_date': -1}},
    {$replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$user', 0]}, '$$ROOT']}}},

    {
      $addFields: {
        comment_count: {$sum: '$comment'}
      }
    },
    {
      $project: {
        head_img: 1,
        account: 1,
        author_id: 1,
        article_id: 1,
        title: 1,
        classification: 1,
        date: 1,
        content: 1,
        read_num: 1,
        comment_count: 1
      }
    },
    {$skip: skip},
    {$limit: config.limit},
    (err, data) => {


      if (err) {
        console.log('error')
        console.log(res)

        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})


    })
})

/**
 * @description 搜索作者全部文章
 * @param {String} skip 跳过多少数据
 * @param {String} authorId 作者ID
 * @return {Array} data
 */
router.post('/api/blog/searchByAuthorAll', [jwtauth], (req, res, next) => {
  // console.log('searchByAuthorAll')
  let skip = parseInt(req.body.skip)
  let authorId = req.body.authorId

  models.Article.aggregate(
    {
      $lookup: { // 左连接
        from: 'logins', // 关联到Login表
        localField: 'author_id', // article 表关联的字段
        foreignField: 'user_id', // user 表关联的字段
        as: 'user'
      }
    },
    {$match: {author_id: {$in: authorId}}},

    {$sort: {'article_date': -1}},
    {$replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$user', 0]}, '$$ROOT']}}},

    {
      $addFields: {
        comment_count: {$sum: '$comment'}
      }
    },
    {
      $project: {
        head_img: 1,
        account: 1,
        title: 1,
        classification: 1,
        date: 1,
        content: 1,
        comment_count: 1
      }
    },
    {$skip: skip},
    {$limit: config.limit},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})

    })
})

/**
 * @description 文章按文章ID搜索
 * @param {String} skip 跳过多少数据
 * @param {Array} articleIdArr 文章ID数组
 * @return {Array} data
 */
router.post('/api/blog/searchByArticleId', (req, res, next) => {
  // console.log('searchByArticleId')
  let skip = parseInt(req.body.skip)
  let articleIdArr = req.body.articleId
  models.Article.aggregate(
    {
      $lookup: { // 左连接
        from: 'logins', // 关联到Login表
        localField: 'author_id', // article 表关联的字段
        foreignField: 'user_id', // user 表关联的字段
        as: 'user'
      }
    },
    {$match: {article_id: {$in: articleIdArr}}},
    {$replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$user', 0]}, '$$ROOT']}}},

    {
      $addFields: {
        comment_count: {$sum: '$comment'}
      }
    },
    {
      $project: {
        head_img: 1,
        account: 1,
        title: 1,
        classification: 1,
        date: 1,
        content: 1,
        comment_count: 1
      }
    },
    {$sort: {'article_date': -1}},
    {$skip: skip},
    {$limit: config.limit},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})
    })
})

/**
 * @description 查询问题反馈
 * @return {Array} data
 */
router.get('/api/admin/check/userProblem', (req, res, next) => {
  // console.log('userProblem')
  models.Problem.find({}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})
  })
})

/**
 * @description 保存私信
 * @param {String} toUid 接收者id
 * @param {String} content 内容
 * @return {String} SUCCESS/FAIL
 */
router.post('/api/user/savePrivateLetter', [jwtauth], (req, res, next) => {
  // console.log('savePrivateLetter')

  let userId = req.userId
  let toUid = req.body.to_uid
  let content = req.body.content
  let privateLetter = {
    _id: 'privateLetter' + uuid.v1(),
    current_uid: userId,
    to_uid: toUid,
    content: content,
    letter_date: (new Date()).valueOf()
  }

  models.Login.update({'user_id': userId}, {$push: {'private_letter': privateLetter}}, (err, data) => {
    if (err) {
      Util.failHand(res,err)
      return
    }
    next({message: config.RES_MSE.SUCCESS_MSG, data: privateLetter, code: config.RES_DATA_CODE.SUCCESS_CODE})
  })
})

/**
 * @description 查询私信内容
 * @param {String} toUid 接受者ID
 * @return {Array} data
 */
router.post('/api/user/getPrivateLetter', [jwtauth], (req, res, next) => {
  // console.log('getPrivateLetter')

  let userId = req.userId
  let toUid = req.body.toUid
  let skip = req.body.skip

  models.Login.aggregate(
    {$match: {$or: [{'user_id': userId}, {'user_id': toUid}]}},
    {$project: {'account': 1, 'head_img': 1, 'nick': 1, 'private_letter': 1}},
    {$unwind: '$private_letter'},
    {$match: {$or: [{'private_letter.to_uid': userId}, {'private_letter.to_uid': toUid}]}},
    {$sort: {'private_letter.letter_date': 1}},
    {$skip: skip},
    {$limit: 10},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})
    })
})
/**
 * @description 查询私信列表
 * @return {Array} data
 */
router.post('/api/user/getPrivateLetterList', [jwtauth], (req, res, next) => {
  // console.log('getPrivateLetterList')

  let userId = req.userId
  let skip = req.body.skip
  models.Login.aggregate(
    {$project: {'account': 1, 'user_id': 1, 'head_img': 1, 'nick': 1, 'private_letter': 1}},
    {$unwind: '$private_letter'},
    {$match: {'private_letter.to_uid': userId}},
    {$sort: {'private_letter.letter_date': 1}},
    {
      $group: {
        '_id': {account: '$account', userId: '$user_id', headImg: '$head_img', nick: '$nick'},
        privateLetter: {$last: '$private_letter'}
      }
    },
    {$skip: skip},
    {$limit: 10},
    (err, data) => {
      if (err) {
        Util.failHand(res,err)
        return
      }
      next({message: config.RES_MSE.SUCCESS_MSG, data: data, code: config.RES_DATA_CODE.SUCCESS_CODE})
    })
})

router.use((info, req, res, next) => {
  res.status(200).json({message: info.message, content: info.data, statusCode: info.code})
})
module.exports = router
