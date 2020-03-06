import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import AdminPage from '@/pages/admin/AdminPage'
import UserLists from '@/pages/admin/basic/UserLists'
import EditArticle from '@/pages/admin/basic/EditArticle'
import ArticleLists from '@/pages/admin/basic/ArticleLists'
import CategoryAdd from '@/pages/admin/basic/CategoryAdd'
import CategoryLists from '@/pages/admin/basic/CategoryLists'
import CreateArticle from '@/pages/admin/basic/CreateArticle'
import Login from '@/pages/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'adminIndex',
      component: Login
    },
    {
        path: '/admin',
        name: 'adminlink',
        component: AdminPage,
        redirect: '/admin/userLists',
        children: [
            { path: 'userLists', name: 'userlink', component: UserLists },
            { path: 'articleLists/editArticle', name: 'editlink', component: EditArticle },
            { path: 'articleLists', name: 'articlelink', component: ArticleLists },
            { path: 'categoryAdd', name: 'categoryAddlink', component: CategoryAdd },
            { path: 'categoryLists', name: 'categorylink', component: CategoryLists },
            { path: 'createArticle', name: 'createArticlelink', component: CreateArticle }
        ]
    },
    {
        path: '/404',
        name: 'notfoundlink',
        component: NotFound
    },
    {
        path: '*',
        redirect: '/404'
    }
  ]
})
