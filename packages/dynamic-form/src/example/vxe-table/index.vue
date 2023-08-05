<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-20 15:31:26
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 18:47:22
-->

<template>
  <InputExpression v-model="inputVal" />
  <div class="table">
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="allAlign = 'left'">居左</vxe-button>
        <vxe-button @click="allAlign = 'center'">居中</vxe-button>
        <vxe-button @click="allAlign = 'right'">居右</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTableRef"
      class="sortable-table"
      :row-config="{ useKey: true, isHover: true }"
      :scroll-y="{ enabled: false }"
      :edit-config="{ trigger: 'dblclick', mode: 'cell' }"
      :menu-config="menuConfig"
      :column-config="{ resizable: true }"
      :align="allAlign"
      :data="tableData"
    >
      <vxe-column width="60">
        <template #default>
          <span class="drag-btn">
            <i class="vxe-icon-edit"></i>
          </span>
        </template>
        <template #header>
          <vxe-tooltip
            v-model="showHelpTip"
            content="按住后可以上下拖动排序！"
            enterable
          >
            <i
              class="vxe-icon-question-circle-fill"
              @click="onClickMoveHandler"
            ></i>
          </vxe-tooltip>
        </template>
      </vxe-column>

      <!-- <vxe-column
        field="name"
        title="Name"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input v-model="row.name" type="text"></vxe-input>
        </template>
      </vxe-column> -->

      <vxe-column
        field="name"
        title="Name"
        :edit-render="{ name: 'MyInput', events: { click: linkEvent } }"
      />

      <vxe-column
        field="expression"
        title="Expression"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input v-model="row.expression" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column
        field="value"
        title="Value"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input v-model="row.value" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column
        field="description"
        title="Description"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input v-model="row.description" type="text"></vxe-input>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
  /**
   * @see https://vxetable.cn/other4/#/table/other/sortableRow
   * @see https://vxetable.cn/#/table/edit/dblclick
   */

  import { nextTick, onUnmounted, reactive, ref } from 'vue';
  import Sortable from 'sortablejs';

  import type { VxeTablePropTypes, VxeTableInstance } from 'vxe-table';

  import InputExpression from '../../components/InputExpression/src/index';

  interface Row {
    no: number;
    name: string;
    expression?: string;
    value: string;
    description?: string;
  }

  const xTableRef = ref({} as VxeTableInstance);
  const showHelpTip = ref(false);

  const inputVal = ref('');

  const allAlign = ref<VxeTablePropTypes.Align>(null);

  const tableData = ref<Row[]>([
    {
      no: 10001,
      name: 'a',
      expression: '1+1',
      value: '2',
      description: '',
    },
    {
      no: 10001,
      name: 'c',
      expression: '1+1',
      value: '2',
      description: '',
    },
    {
      no: 10001,
      name: 'b',
      expression: '1+1',
      value: '2',
      description: '',
    },
  ]);

  const menuConfig = reactive<VxeTablePropTypes.MenuConfig<Row>>({
    body: {
      options: [
        [
          {
            code: 'copy',
            name: '复制',
            prefixIcon: 'vxe-icon-copy',
            disabled: false,
          },
          { code: 'reload', name: '刷新', disabled: false },
          { code: 'insertAt', name: '插入', disabled: false },
          { code: 'remove', name: '删除', disabled: false },
          {
            code: 'save',
            name: '保存',
            prefixIcon: 'vxe-icon-save',
            disabled: false,
          },
        ],
      ],
    },
  });

  let sortable: any;
  const rowDrop = () => {
    const $table = xTableRef.value;
    sortable = Sortable.create(
      $table.$el.querySelector('.body--wrapper > .vxe-table--body tbody'),
      {
        handle: '.drag-btn',
        onEnd: (sortableEvent: any) => {
          const newIndex = sortableEvent.newIndex as number;
          const oldIndex = sortableEvent.oldIndex as number;
          const currRow = tableData.value.splice(oldIndex, 1)[0];
          tableData.value.splice(newIndex, 0, currRow);
        },
      },
    );
  };

  let initTime: any;
  nextTick(() => {
    // 加载完成之后在绑定拖动事件
    initTime = setTimeout(() => {
      rowDrop();
    }, 500);
  });

  onUnmounted(() => {
    clearTimeout(initTime);
    if (sortable) {
      sortable.destroy();
    }
  });

  const onClickMoveHandler = () => {
    showHelpTip.value = !showHelpTip.value;
  };

  const linkEvent = ({ row }: any) => {
    console.log('ssss', row.name);
  };
</script>

<style lang="scss">
  .table {
    width: 90vw;
  }

  .sortable-table .drag-btn {
    font-size: 12px;
    cursor: move;
  }

  .sortable-table .vxe-body--row.sortable-ghost,
  .sortable-table .vxe-body--row.sortable-chosen {
    background-color: #dfecfb;
  }
</style>
