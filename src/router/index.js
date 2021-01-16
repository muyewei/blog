import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/hello'
import blogindex from '@/components/blogindex'
import notFoundIndex from '@/components/notFoundIndex'
import tp from '@/components/transitionPage'
const mainData = () => import('../components/mainData.vue')
const myarticle = () => import('../components/myarticle.vue')
const backstage = () => import('../components/backstage.vue')
const sal = () => import('../components/simpleArticleList.vue')
const scl = () => import('../components/simpleCommentList.vue')
const sul = () => import('../components/simpleUserList.vue')
const blog = () => import('../components/blog.vue')
const wd = () => import('../components/webdata.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: hello
    },
    {
      path: '/index/:type?',
      component: blogindex,
      children: [
        {
          path: '',
          component: mainData
        },
        {
          path: 'article/:id',
          component: myarticle
        }
      ]
    },
    {
      path: '/backstage',
      component: backstage,
      children: [
        {
          path: '',
          component: wd
        },
        {
          path: 'webdata',
          component: wd
        },
        {
          path: 'articlelist',
          component: sal
        },
        {
          path: 'commentlist',
          component: scl
        },
        {
          path: 'userlist',
          component: sul
        },
        {
          path: 'blog',
          component: blog
        }
      ]
    },
    {
      path: '/tp',
      component: tp
    },
    {
      path: '*',
      component: notFoundIndex
    }
  ]
})
