/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-27 14:05:35
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 18:50:42
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
  Icon,

  // 可选组件
  Column,
  VxeButton,
  VxeToolbar,
  VxeInput,
  VxeTooltip,

  // 表格
  Table,
} from 'vxe-table';

import 'vxe-table/styles/index.scss';

import InputExpression from '../../components/InputExpression/src/index';

const components = [
  Edit,
  Menu,
  Validator,
  Icon,
  Column,
  VxeButton,
  VxeToolbar,
  VxeInput,
  VxeTooltip,
  Table,
];

// 创建一个简单的输入框渲染
VXETable.renderer.add('MyInput', {
  // 激活时自动聚焦
  autofocus: '.my-cell',

  // renderDefault (renderOpts, params) {
  //   let { row, column } = params
  //   let { events } = renderOpts as any
  //   return <a class="my-cell" onClick={ () => events.click(params) }>{row[column.field]}</a>
  // },

  // 可编辑激活模板
  renderEdit(renderOpts, params) {
    const { row, column } = params;
    return <InputExpression class="my-cell" v-model={row[column.field]} />;
  },
  // 可编辑显示模板
  renderCell(renderOpts, params) {
    const { row, column } = params;
    let { events } = renderOpts as any;
    console.log('renderCell');
    return (
      <a class="my-cell" onClick={() => events.click(params)}>
        {row[column.field]}
      </a>
    );
  },
});

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
});

export const setupVXETable = (app: App<Element>) => {
  // app.use(VXETable as any);

  components.forEach((cmpt: Plugin) => {
    app.use(cmpt);
  });
};
