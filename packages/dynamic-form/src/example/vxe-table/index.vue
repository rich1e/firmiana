<!--
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-20 15:31:26
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 10:31:20
-->

<template>
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
      :edit-config="{ trigger: 'dblclick', mode: 'cell' }"
      :menu-config="menuConfig"
      :column-config="{ resizable: true }"
      :align="allAlign"
      :data="tableData"
      :row-config="{ isHover: true }"
    >
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-column
        field="name"
        title="Name"
        :edit-render="{ autofocus: '.vxe-input--inner' }"
      >
        <template #edit="{ row }">
          <vxe-input v-model="row.name" type="text"></vxe-input>
        </template>
      </vxe-column>
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
        title="Eescription"
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
  import { reactive, ref } from 'vue';
  import { VxeTablePropTypes } from 'vxe-table';

  interface Row {
    no: number;
    name: string;
    expression?: string;
    value: string;
    description?: string;
  }

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
</script>

<style lang="scss" scoped>
  .table {
    width: 90vw;
  }
</style>
