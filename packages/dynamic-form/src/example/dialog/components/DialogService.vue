<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-13 14:57:55
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-13 17:04:48
 * @FilePath: /vue-form/src/example/dialog/components/DialogService.vue
 * @Description:
 *
-->
<script lang="ts">
  export default {
    name: 'DialogService',
  };
</script>

<script setup lang="ts">
  import { computed, defineEmits, defineProps, ref, withDefaults } from 'vue';
  // 纯函数调用时必须，不然解析不出<el-dialog></el-dialog>、<el-button />
  import { ElButton, ElDialog } from 'element-plus';

  interface Props {
    [key: string]: any;
    modelValue: boolean;
    title: string;
    cancelText?: string;
    confirmText?: string;
    loading?: boolean;
    contentBody?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    title: '',
    cancelText: '取消',
    confirmText: '确定',
    loading: false,
    contentBody: null,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', val: boolean): void;
    (e: 'cancel'): void;
    (e: 'close'): void;
    (e: 'confirm'): void;
  }>();

  // 纯js实例调用改变loading属性
  const _loading = ref(false);

  const confirmLoading = computed(() => {
    return props.loading || _loading.value;
  });

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });

  // methods
  const handleCancel = () => {
    emits('cancel');
    visible.value = false;
  };

  const showLoading = () => {
    _loading.value = true;
  };

  const hideLoading = () => {
    _loading.value = false;
  };

  // 暴露给纯js实例调用，可在实例中使用instance._instance.exposed调用
  defineExpose({ showLoading, hideLoading });
</script>

<template>
  <el-dialog :title="title" v-model="visible">
    <slot>
      <!-- 渲染纯js窗体 -->
      <div v-html="contentBody" v-if="contentBody"></div>
    </slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel" :disabled="confirmLoading">
          {{ cancelText }}
        </el-button>
        <el-button
          type="primary"
          :loading="confirmLoading"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
