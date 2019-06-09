import Vue from 'vue'
import Router from 'vue-router'

import loginRegister from './LoginRegister'
import IndexPage from '@/views/IndexPage'
import HomePage from '@/views/public/HomePage'
import Search from '@/views/public/Search'
import User from '@/views/user/User'
import Author from '@/views/Author/Author'
import SendPrivateLetter from '@/views/Author/SendPrivateLetter'
import Problem from '@/views/user/Problem'
import BookMarks from '@/views/user/BookMarks'
import Dynamic from '@/views/user/Dynamic'
import Message from '@/views/message/Message'
import BaseSetting from '@/views/user/BaseSetting'
import BrowseRecord from '@/views/user/BrowseRecord'
import NewArticle from '@/views/blog/NewArticle'
import ArticleDiscover from '@/views/blog/ArticleDiscover'
import ArticleDetails from '@/views/blog/ArticleDetails'
import NotFoundComponent from '@/views/public/NotFoundComponent'
import Drafts from '@/views/blog/Drafts'

import SearchAuthorByTitle from '@/views/Author/SearchAuthorByTitle'
import ChangePassword from '@/views/loginRegister/ChangePassword'
import CheckEmail from '@/views/loginRegister/CheckEmail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    loginRegister,
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/SearchAuthorByTitle/:authorId',
      name: 'SearchAuthorByTitle',
      component: SearchAuthorByTitle
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      meta: {requiresAuth: true}
    },
    {
      path: '/Author/:authorId',
      name: 'Author',
      component: Author,
      meta: {requiresAuth: true}
    },
    {
      path: '/SendPrivateLetter/:authorInfo',
      name: 'SendPrivateLetter',
      component: SendPrivateLetter,
      meta: {requiresAuth: true}
    },
    {
      path: '/Problem',
      name: 'Problem',
      component: Problem
    },
    {
      path: '/BookMarks/:bookmarks',
      name: 'BookMarks',
      component: BookMarks,
      meta: {requiresAuth: true}
    },
    {
      path: '/Dynamic',
      name: 'Dynamic',
      component: Dynamic,
      meta: {requiresAuth: true}
    },
    {
      path: '/Message',
      name: 'Message',
      component: Message,
      meta: {requiresAuth: true}
    },
    {
      path: '/BaseSetting',
      name: 'BaseSetting',
      component: BaseSetting,
      meta: {requiresAuth: true}
    },
    {
      path: '/NewArticle',
      name: 'NewArticle',
      component: NewArticle,
      meta: {requiresAuth: true}

    },
    {
      path: '/ArticleDiscover',
      name: 'ArticleDiscover',
      component: ArticleDiscover
    },
    {
      path: '/ArticleDetails/:articleId',
      name: 'ArticleDetails',
      component: ArticleDetails
    },
    {
      path: '/Drafts',
      name: 'Drafts',
      component: Drafts
    },
    {
      path: '/BrowseRecord',
      name: 'BrowseRecord',
      component: BrowseRecord
    },
    {
      path: '/CheckEmail',
      name: 'CheckEmail',
      component: CheckEmail
    },
    {
      path: '/ChangePassword/:account',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '*',
      name: 'NotFoundComponent',
      component: NotFoundComponent
    }
  ]
})
