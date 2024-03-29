import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/document',
  name: 'Document',
  redirect: '/document/document_list',
  component: () => import('@/layouts/index.vue'),
  meta: {
    title: '文档管理',
    icon: 'ep:folder',
  },
  children: [
    {
      path: 'document_list',
      name: 'DocumentList',
      component: () => import('@/views/document_manage/document_list/document_list.vue'),
      meta: {
        title: '文档列表',
        icon: 'ep:notebook',
      },
      children: [
        {
          path: 'create',
          name: 'CreateDocument',
          component: () => import('@/views/document_manage/document_list/create_document.vue'),
          meta: {
            title: '新建文档',
            sidebar: false,
            icon: 'ep:document-add',
          },
        },
        {
          path: 'edit/:id',
          name: 'EditDocument',
          component: () => import('@/views/document_manage/document_list/edit_document.vue'),
          meta: {
            title: '编辑文档',
            sidebar: false,
            icon: 'ep:edit',
          },
        },
      ],
    },
    {
      path: 'article_list',
      name: 'ArticleList',
      component: () => import('@/views/document_manage/article_list.vue'),
      meta: {
        title: '文章列表',
        icon: 'ep:document',
      },
    },
  ],
}

export default routes
