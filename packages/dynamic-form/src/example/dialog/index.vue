<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-10 16:30:54
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-13 17:29:38
 * @FilePath: /vue-form/src/example/dialog/index.vue
 * @Description:
 *
-->
<script setup lang="ts">
  import { ElButton } from 'element-plus';
  import { reactive, ref } from 'vue';

  import FiDialog from './components/Dialog.vue';
  import BaseViewVue from '/@/components/Layouts/BaseView.vue';

  import CreateDialog from './components/CreateDialog';
  import SingleDialog from './components/SingleDialog';

  const setDialogVisible = ref(false);
  const setDialogVisible2 = ref(false);
  const setDialogVisible3 = ref(false);

  const state = reactive({
    modelValue: false,
  });

  const openHandler = () => {
    console.log('This openHandler');
  };

  const updateTitleHandler = (title: string) => {
    console.log('updateTitleHandler', title);
  };

  const onClickHandler = () => {
    console.log('CreateDialog');
    CreateDialog({
      title: '弹窗3',
      visible: setDialogVisible3.value,
      modelValue: setDialogVisible3,
      'onUpdate:modelValue': (value: any) => {
        console.log('#SingleDialog onUpdate:modelValue', value);
        setDialogVisible3.value = value;
      },
    });
  };

  // const onClickHandler2 = () => {
  //   console.log('SingleDialog');
  //   SingleDialog({
  //     title: '弹窗4',
  //     modelValue: setDialogVisible4,
  //     'onUpdate:modelValue': (value: any) => {
  //       console.log('#SingleDialog onUpdate:modelValue', value);
  //       setDialogVisible4.value = value;
  //     },
  //     onClose: () => {
  //       console.log('#onClose SingleDialog');
  //     },
  //   });
  // };

  const onClickHandler2 = () => {
    const dialog = SingleDialog({
      title: '操作确认',
      content: '<div>是否确定删除数据？</div>',
      onConfirm: () => {
        return new Promise(async (resolve: any) => {
          dialog.showLoading();
          setTimeout(() => {
            dialog.hideLoading();
            resolve();
          }, 1500);
        });
      },
    });
  };

  const onClickHandler3 = () => {
    const dialog = SingleDialog({
      title: '操作确认2',
      content: '<div>是否确定删除数据？</div>',
      onConfirm: () => {
        return new Promise(async (resolve: any) => {
          dialog.showLoading();
          setTimeout(() => {
            dialog.hideLoading();
            resolve();
          }, 1500);
        });
      },
    });
  };
</script>

<template>
  <BaseViewVue>
    <template #header> Dialog </template>
    <template #main>
      <ElButton text @click="setDialogVisible = true"> 打开弹窗1 </ElButton>
      <ElButton text @click="setDialogVisible2 = true"> 打开弹窗2 </ElButton>
      <ElButton text @click="onClickHandler"> 打开弹窗3 </ElButton>
      <ElButton text @click="onClickHandler2"> 打开弹窗4 </ElButton>
      <ElButton text @click="onClickHandler3"> 打开弹窗5 </ElButton>
      <div>
        <FiDialog v-model="setDialogVisible" @open="openHandler" title="弹窗1">
          <span>This is a message 1</span>
          <template #footer>
            <ElButton @click="setDialogVisible = false">Cancel</ElButton>
          </template>
        </FiDialog>
        <FiDialog
          v-model="setDialogVisible2"
          @open="openHandler"
          title="弹窗2"
          :update-title="updateTitleHandler"
        >
          <span>This is a message 2</span>
          <template #footer>
            <ElButton @click="setDialogVisible2 = false">Cancel</ElButton>
          </template>
        </FiDialog>
      </div>
    </template>
  </BaseViewVue>
</template>
