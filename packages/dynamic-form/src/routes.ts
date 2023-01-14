/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 09:54:23
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-11 10:57:50
 * @FilePath: /vue-form/src/routes.ts
 * @Description:
 *
 */
import type { App } from 'vue';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

/**
 * @description App自定义页面路由信息
 */
interface AppPageMeta extends RouteMeta {
  /** 页面标题 */
  title?: string;
  /** 页面是否缓存 */
  keepAlive?: boolean;
}

export type AppRouteRecord = RouteRecordRaw & {
  /** 页面路由信息 */
  meta: AppPageMeta;
};

const routes: AppRouteRecord[] = [
  {
    path: '/',
    component: () => import('./views/Default.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/uniseriate',
    component: () => import('./views/Uniseriate.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/biserial',
    component: () => import('./views/Biserial.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/group',
    component: () => import('./views/Group.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/tab',
    component: () => import('./views/Tab.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/dialog',
    component: () => import('./example/dialog/index.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/flex',
    component: () => import('./views/Flex.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/http',
    component: () => import('./views/Http.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/instance',
    component: () => import('./example/getCurrentInstance/index.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/jsx',
    component: () => import('./example/jsx/index.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/form',
    component: () => import('./example/form/index.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/jsx-form',
    component: () => import('./example/jsxForm/index'),
    meta: {
      title: '',
    },
  },

  {
    path: '/dynamic-components',
    component: () => import('./example/dynamicComponents/index'),
    meta: {
      title: '',
    },
  },

  {
    path: '/slots',
    component: () => import('./example/slots/index.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/multi-column-form',
    component: () => import('./example/multi-column-form/index.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/typewriter',
    component: () => import('./example/typewriter/index.vue'),
    meta: {
      title: '',
    },
  },

  {
    path: '/table',
    component: () => import('./example/table/index.vue'),
    meta: {
      title: '',
    },
  },

  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue'),
    meta: {
      title: '404',
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
  // TODO 创建路由守卫
  // createRouterGuards(router);
}

export default router;
