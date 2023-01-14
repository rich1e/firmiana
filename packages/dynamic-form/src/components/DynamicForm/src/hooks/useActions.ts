/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-11 16:34:52
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-06 15:40:18
 * @FilePath: /vue-form/src/components/DynamicForm/src/hooks/useActions.ts
 * @Description:
 *
 */

import { router } from '../../../../routes';

/**
 * // TODO router 需要通过参数传递过来
 */
export const pageBack = () => {
  router.back();
};

// TODO formEl 类型
export const onRest = (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
};

export const onSubmit = (formEl: any) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
