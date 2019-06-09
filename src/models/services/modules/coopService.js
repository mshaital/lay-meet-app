/* eslint-disable */
import Apis from '../apis'
import AxiosManager from '~models/managers/axiosManager'

export default {

  upload (params) {
    return AxiosManager.post(Apis.upload, params)
  },
  getImgUploadToken (params) {
    return AxiosManager.post(Apis.getImgUploadToken, params)
  },

  userRegister (params) {
    return AxiosManager.post(Apis.userRegister, params)
  },

  getAllArticle  (params, config) {
    return AxiosManager.post(Apis.getAllArticle, params, config)
  },

  getArticleDetailsAndAuthorInfo (params, config) {
    return AxiosManager.post(Apis.getArticleDetailsAndAuthorInfo, params, config)
  },

  getAccount (params) {
    return AxiosManager.post(Apis.getAccount, params)
  },

  getArticleListByAuthor (params, config) {
    return AxiosManager.post(Apis.getArticleListByAuthor, params, config)
  },

  searchByAuthorAll (params, config) {
    return AxiosManager.post(Apis.searchByAuthorAll, params, config)
  },

  searchArticleByTitle (params) {
    return AxiosManager.post(Apis.searchArticleByTitle, params)
  },

  searchAuthorArticleByTitle (params) {
    return AxiosManager.post(Apis.searchAuthorArticleByTitle, params)
  },

  getArticle (params) {
    return AxiosManager.post(Apis.getArticle, params)
  },

  searchByArticleId (params, config) {
    return AxiosManager.post(Apis.searchByArticleId, params, config)
  },

  createArticle (params) {
    return AxiosManager.post(Apis.createArticle, params)
  },

  updateArticle (params) {
    return AxiosManager.post(Apis.updateArticle, params)
  },

  addReadNumber (params, config) {
    return AxiosManager.post(Apis.addReadNumber, params, config)
  },

  createComment (params) {
    return AxiosManager.post(Apis.createComment, params)
  },

  getUserComment (params) {
    return AxiosManager.get(Apis.getUserComment, params)
  },

  getCommentByAuthorId (params) {
    return AxiosManager.get(Apis.getCommentByAuthorId, params)
  },

  getUserDynamic (params) {
    return AxiosManager.get(Apis.getUserDynamic, params)
  },

  createArticleDraft (params) {
    return AxiosManager.post(Apis.createArticleDraft, params)
  },

  updataArticleDraft (params) {
    return AxiosManager.post(Apis.updataArticleDraft, params)
  },

  getArticleDraftList (params) {
    return AxiosManager.get(Apis.getArticleDraftList, params)
  },

  addUserAuthorFollow (params) {
    return AxiosManager.post(Apis.addUserAuthorFollow, params)
  },

  addUserAuthorUnFollow (params) {
    return AxiosManager.post(Apis.addUserAuthorUnFollow, params)
  },

  createBookmarks (params) {
    return AxiosManager.post(Apis.createBookmarks, params)
  },

  deleteBookmarks (params) {
    return AxiosManager.post(Apis.deleteBookmarks, params)
  },

  getReceivedBookmarks (params) {
    return AxiosManager.post(Apis.getReceivedBookmarks, params)
  },

  savePrivateLetter (params) {
    return AxiosManager.post(Apis.savePrivateLetter, params)
  },

  getPrivateLetter (params) {
    return AxiosManager.post(Apis.getPrivateLetter, params)
  },

  getPrivateLetterList (params) {
    return AxiosManager.post(Apis.getPrivateLetterList, params)
  },

  getAuthorInfo (params, config) {
    return AxiosManager.post(Apis.getAuthorInfo, params, config)
  },

  userInfoModify (params) {
    return AxiosManager.post(Apis.userInfoModify, params)
  },

  userModifyHeadImg (params) {
    return AxiosManager.post(Apis.userModifyHeadImg, params)
  },

  getAuthorListById (params) {
    return AxiosManager.post(Apis.getAuthorListById, params)
  },

  saveComplaintSuggestion (params) {
    return AxiosManager.post(Apis.saveComplaintSuggestion, params)
  },
  checkEmail (params) {
    return AxiosManager.post(Apis.checkEmail, params)
  },
  changePassword (params) {
    return AxiosManager.post(Apis.changePassword, params)
  },
}
