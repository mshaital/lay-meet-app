/* eslint-disable */
const getAllArticle = '/api/blog/getAllArticle' // 所有文章

const getAccount = '/api/login/getAccount' // 获取用户信息

const userRegister = '/api/login/userRegister' // 用户注册
const getArticleDetailsAndAuthorInfo = '/api/blog/getArticleDetailsAndAuthorInfo' // 公共文章详情
const getArticleListByAuthor = '/api/blog/getArticleListByAuthor' // 搜索作者公开文章
const searchByAuthorAll = '/api/blog/searchByAuthorAll' // 搜索作者全部文章
const searchByArticleId = '/api/blog/searchByArticleId' // 查询点赞的文章
const searchArticleByTitle = '/api/blog/searchArticleByTitle' // 查询
const searchAuthorArticleByTitle = '/api/blog/searchAuthorArticleByTitle' // 搜索文章 某个作者按标题
const getArticle = '/api/blog/check/getArticle' // 查找文章详情
const createArticle = '/api/blog/check/createArticle' // 新建文章
const updateArticle = '/api/blog/check/updateArticle' // 更新文章
const addReadNumber = '/api/blog/addReadNumber' // 增加阅读数量
const createComment = '/api/blog/check/createComment' // 创建评论
const getUserComment = '/api/blog/getMyComment' // 查询我发出的评论
const getCommentByAuthorId = '/api/blog/getCommentByAuthorId' // 查询发给我的评论


const createArticleDraft = '/api/blog/check/createArticleDraft' // 新建文章草稿
const updataArticleDraft = '/api/blog/updataArticleDraft' // 更新文章草稿
const getArticleDraftList = '/api/blog/check/getArticleDraftList' // 用户文章草稿列表


const addUserAuthorFollow = '/api/user/check/userAuthorFollow' // 关注
const addUserAuthorUnFollow = '/api/user/check/userAuthorUnFollow' // 取消关注
const createBookmarks = '/api/user/check/createBookmarks' // 创建收藏
const deleteBookmarks = '/api/user/check/deleteBookmarks' // 取消收藏
const getReceivedBookmarks = '/api/user/check/getReceivedBookmarks' // 查询被收藏
const savePrivateLetter = '/api/user/savePrivateLetter' // 保存私信
const getPrivateLetter = '/api/user/getPrivateLetter' // 查询私信
const getPrivateLetterList = '/api/user/getPrivateLetterList' // 查询私信列表

const getAuthorInfo = '/api/login/getAuthorInfo' // 获取用户信息
const userInfoModify = '/api/user/check/userInfoModify' // 修改用户信息
const userModifyHeadImg = '/api/user/userModifyHeadImg' // 修改用户信息

const getAuthorListById = '/api/login/getAuthorListById' // 按user_id查询用户信息列表 （公开）（查询浏览记录）

const saveComplaintSuggestion = '/api/sys/check/saveComplaintSuggestion' // 投诉建议
const getUserDynamic = '/api/user/getUserDynamic' // 查询动态



/**
 * 分离的接口与其缩写列表
 */
export default {
  userRegister,
  getAllArticle,
  getArticleDetailsAndAuthorInfo,
  getAccount,
  getArticleListByAuthor,
  searchByAuthorAll,
  searchByArticleId,
  searchArticleByTitle,
  searchAuthorArticleByTitle,
  getArticle,
  createArticle,
  updateArticle,
  addReadNumber,
  createComment,
  getUserComment,
  getCommentByAuthorId,
  getUserDynamic,

  createArticleDraft,
  updataArticleDraft,
  getArticleDraftList,

  addUserAuthorFollow,
  addUserAuthorUnFollow,
  createBookmarks,
  deleteBookmarks,
  getReceivedBookmarks,
  savePrivateLetter,
  getPrivateLetter,
  getPrivateLetterList,

  getAuthorInfo,
  userInfoModify,
  userModifyHeadImg,

  getAuthorListById,

  saveComplaintSuggestion,
}
