/*
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-12 18:04:07
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-13 17:07:23
 * @FilePath: /vue-form/src/example/dialog/components/CreateDialog.ts
 * @Description:
 *
 */
import { createVNode, render } from 'vue';
import FiDialog from './Dialog.vue';

/**
 * 每次调用会创建新的dialog
 * @see https://www.jianshu.com/p/6fb680c387be
 * @see https://www.dingsky.com/article/25.html
 * @see https://juejin.cn/post/6980916501314289678
 */

let mountNode = null;

const CreateDialog = (options: any) => {
  const dialogInstance = createVNode(FiDialog, {
    ...options,
  });
  // 创建一个空的div
  mountNode = document.createElement('div');
  // render函数的作用就是将FiDialog组件的虚拟DOM转换成真实DOM并插入到mountNode元素里
  render(dialogInstance, mountNode);
  // 然后把转换成真实DOM的FiDialog组件插入到body里
  document.body.appendChild(mountNode);
};

export default CreateDialog;
