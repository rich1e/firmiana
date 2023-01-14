/*
 * @Author: rich1e
 * @Date: 2022-11-11 18:43:42
 * @LastEditors: rich1e
 * @LastEditTime: 2022-11-14 14:57:24
 */
// test.ts

import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      };
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
  {
    url: '/api/form',
    method: 'post',
    response: async (req, res) => {
      const field = [
        {
          controlType: 'Input',
          label: '姓名',
          prop: 'username',
          props: {
            type: 'text',
            placeholder: '请输入姓名',
            modelValue: 'username',
          },
          bind: 'x',
          default: '-',
        },
        {
          controlType: 'Input',
          label: '曾用名',
          prop: 'iiusername',
          props: {
            type: 'text',
            placeholder: '请输入姓名',
            modelValue: 'iiusername',
          },
          bind: 'x',
          default: '-',
        },
        {
          controlType: 'Input',
          label: '年龄',
          prop: 'age',
          props: {
            type: 'text',
            placeholder: '请输入年龄',
            modelValue: 'age',
          },
          bind: 'x',
          default: '-',
        },
        {
          controlType: 'Switch',
          label: '已婚',
          prop: 'married',
          props: {
            activeText: '是',
            inactiveText: '否',
            modelValue: 'married',
          },
          bind: 'x',
          default: '-',
        },
        {
          controlType: 'Select',
          label: '出生地',
          prop: 'birth',
          props: {
            placeholder: '请选择出生地',
            modelValue: 'birth',
          },
          options: [
            {
              value: 'Option1',
              label: '上海',
            },
            {
              value: 'Option2',
              label: '北京',
            },
            {
              value: 'Option3',
              label: '深圳',
            },
            {
              value: 'Option4',
              label: '重庆',
            },
            {
              value: 'Option5',
              label: '天津',
            },
          ],
          bind: 'x',
          disabled: true,
        },
      ];
    },
  },
] as MockMethod[];
