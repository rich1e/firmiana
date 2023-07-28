/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-27 14:05:35
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 10:33:34
 */
import type { App, Plugin } from 'vue';

import XEUtils from 'xe-utils';
import zhCN from 'vxe-table/es/locale/lang/zh-CN';

import {
  // 核心
  VXETable,

  // 功能模块
  Edit,
  Menu,
  Validator,

  // 可选组件
  Column,
  VxeButton,
  VxeToolbar,
  VxeInput,

  // 表格
  Table,
} from 'vxe-table';

import 'vxe-table/styles/index.scss';

const components = [
  Edit,
  Menu,
  Validator,
  Column,
  VxeButton,
  VxeToolbar,
  VxeInput,
  Table,
];

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
});

export const setupVXETable = (app: App) => {
  components.forEach((cmpt: Plugin) => {
    app.use(cmpt);
  });
};
