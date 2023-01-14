import type { App } from 'vue';
import { createApp } from 'vue';
import DialogService from './DialogService.vue';

/**
 * 每次打开时会动态创建 dialog，
 * 确认和取消的时候，会动态删除 dialog
 * @see https://juejin.cn/post/7136099187057721380
 */

interface Props {
  title: string;
  content: any;
  onCancel?: () => void;
  onConfirm?: () => void;
}

type SingleDialogType = (props: Props) => any;

type AppInstance = App<Element> & {
  showLoading: () => void;
  hideLoading: () => void;
};

const SingleDialog: SingleDialogType = ({
  title,
  content,
  onCancel,
  onConfirm,
}) => {
  const mountNode: HTMLElement = document.createElement('div');

  const instance = createApp(DialogService, {
    title,
    modelValue: true,
    contentBody: content,
    onCancel: () => {
      instance.unmount();
      document.body.removeChild(mountNode);
      onCancel && onCancel();
    },
    onConfirm: async () => {
      if (onConfirm) {
        await onConfirm();
      }
      instance.unmount();
      document.body.removeChild(mountNode);
    },
  }) as AppInstance;

  document.body.appendChild(mountNode);
  instance.mount(mountNode);

  // 显示dialog loading
  instance.showLoading = () => {
    // @ts-ignore
    instance._instance.exposed.showLoading();
  };

  // 关闭dialog loading
  instance.hideLoading = () => {
    // @ts-ignore
    instance._instance.exposed.hideLoading();
  };

  return instance;
};

export default SingleDialog;
