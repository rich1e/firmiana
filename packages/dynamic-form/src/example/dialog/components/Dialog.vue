<!--
 * @Author: yuqigong@outlook.com
 * @Date: 2023-01-10 16:54:38
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2023-01-13 17:30:23
 * @FilePath: /vue-form/src/example/dialog/components/Dialog.vue
 * @Description:
 *
-->

<script lang="ts">
  export default {
    name: 'FiDialog',
    /**
     * 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings)
     * 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
     * 当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。
     * 通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。
     * @see https://juejin.cn/post/7046282409767092237
     * @see https://www.cnblogs.com/IwishIcould/p/16815907.html
     */
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import { ref, useAttrs, withDefaults } from 'vue';
  /**
   * @see https://github.com/element-plus/element-plus/blob/v1.0.1-beta.24/website/docs/zh-CN/dialog.md
   */
  import { ElDialog } from 'element-plus';

  interface Props {
    updateTitle?: (title: string) => void;
    visible?: boolean;
  }

  const attrs = useAttrs();

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
  });

  /**
   * ElDialog 不设置 v-model 会提示 ts 错误，参考下列方式额外提供了 visible 属性
   * @see https://github.com/Jlnvv-tom/Secondary-development-component/blob/main/packages/modelForm/src/index.vue
   * @see https://github.com/Jlnvv-tom/Secondary-development-component/blob/main/src/views/modelForm/index.vue
   */
  const dialogVisible = ref(props.visible!);

  /**
   * [Vue Warn] toRefs() expects a reactive object but received a plain one.
   * @see https://juejin.cn/post/6943053588100825095
   */
  const { title } = attrs;

  console.table(attrs);

  const toggleEdit = (
    text: HTMLElement,
    input: HTMLElement,
    state: boolean,
  ) => {
    if (state) {
      text.style.display = 'none';
      input.style.display = 'block';
    } else {
      text.style.display = 'block';
      input.style.display = 'none';
    }
  };

  const dblClickHandler = (event: MouseEvent) => {
    const span = event.target as HTMLSpanElement;
    const editInput = span.nextElementSibling as HTMLInputElement;
    // 开启编辑状态
    toggleEdit(span, editInput, true);

    editInput.onblur = (val: FocusEvent) => {
      const _self = val.target as HTMLInputElement;
      span.innerText = _self.value;
      // 关闭编辑状态
      toggleEdit(span, _self, false);

      if (props.updateTitle) {
        props.updateTitle(_self.value);
      }
    };
  };

  // watch(
  //   () => [modelValue.value, title.value],
  //   (newVal1, newVal2) => {
  //     console.log('watch', newVal1, newVal2);
  //   },
  // );
</script>

<template>
  <ElDialog v-model="dialogVisible" v-bind="$attrs">
    <template v-for="(_, name) in $slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template #title v-if="title">
      <span @dblclick="dblClickHandler">{{ title }}</span>
      <input type="text" class="edit" />
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
  .edit {
    display: none;
  }
</style>
