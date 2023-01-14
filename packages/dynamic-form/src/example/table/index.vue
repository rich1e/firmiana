<script setup lang="ts">
  import { ref } from 'vue';

  import type { TableColumnCtx } from 'element-plus';
  import { ElTable, ElTableColumn, ElInput } from 'element-plus';

  const isNewItem = ref(false);
  const refTable = ref<InstanceType<typeof ElTable> | null>(null);

  const columnList = [
    { prop: 'idx', label: 'Index', width: '100' },
    { prop: 'gName', label: 'Name', width: '100' },
    { prop: 'gExp', label: 'Expression', width: '180' },
    { prop: 'gVal', label: 'Value', width: '100' },
    { prop: 'gDes', label: 'Descripion', width: '300' },
  ];

  const tableData = ref([
    {
      idx: { content: 1, show: true },
      gName: { content: 'user', show: true },
      gExp: { content: '', show: true },
      gVal: { content: 100, show: true },
      gDes: { content: '', show: true },
    },
    {
      idx: { content: 2, show: true },
      gName: { content: 'pwd', show: true },
      gExp: { content: '', show: true },
      gVal: { content: 100, show: true },
      gDes: { content: '', show: true },
    },
    {
      idx: { content: 3, show: true },
      gName: { content: 'pwd2', show: true },
      gExp: { content: '', show: true },
      gVal: { content: 100, show: true },
      gDes: { content: '', show: true },
    },
  ]);

  /**
   * 双击编辑单元格
   * @param {*} row
   * @param {*} column
   * @param {*} cell
   * @param {*} event
   * @see https://element-plus.org/en-US/component/table.html#table-events
   * @see https://blog.csdn.net/weixin_44206947/article/details/123711033
   */
  const spanDblClickHandler = (event: any, row: any, cell: any) => {
    // row[cell.prop].show = false;
    // event.target.nextElementSibling.firstElementChild
    console.log(event, cell, row);
    // debugger;

    event.target.style.display = 'none';
    const cellInput = document.createElement('input');
    cellInput.value = row[cell.prop].content;
    cellInput.setAttribute('type', 'text');
    cellInput.style.width = '60%';
    cellInput.style.marginLeft = '10px';
    cellInput.style.paddingLeft = '5px';
    /**
     * @see https://www.jianshu.com/p/0c8d831f1e3a
     */
    cellInput.style.outlineColor = '#40B8FA';
    event.target.parentNode.appendChild(cellInput);

    // 聚焦
    cellInput.focus();
    // 失焦事件
    cellInput.onblur = function () {
      event.target.parentNode.removeChild(cellInput);
      event.target.innerText = cellInput.value;
      event.target.style.display = 'block';
      row[cell.prop].content = cellInput.value;
    };
  };

  const spanDblClickHandler2 = (event: any, row: any, cell: any) => {
    if (cell.prop === 'idx') return;

    row[cell.prop].show = false;
    const cellInput = event.target.nextElementSibling.firstElementChild;
    console.log(event, cell, row);
    // debugger;

    // event.target.style.display = 'none';
    // const cellInput = document.createElement('input');
    cellInput.value = row[cell.prop].content;
    // cellInput.setAttribute('type', 'text');
    cellInput.style.width = '60%';
    cellInput.style.marginLeft = '10px';
    cellInput.style.paddingLeft = '5px';
    /**
     * @see https://www.jianshu.com/p/0c8d831f1e3a
     */
    cellInput.style.outlineColor = '#40B8FA';
    // event.target.parentNode.appendChild(cellInput);

    // 聚焦
    /**
     * @see https://blog.51cto.com/u_15322220/3283617
     */
    setTimeout(() => {
      cellInput.focus();
    }, 0);
    // 失焦事件
    // cellInput.onblur = function () {
    //   event.target.parentNode.removeChild(cellInput);
    //   event.target.innerText = cellInput.value;
    //   event.target.style.display = 'block';
    //   row[cell.prop].content = cellInput.value;
    // };
  };

  // TODO new-item 为空时
  const deleteRow = (rowIdx: any, row: any) => {
    console.log(rowIdx);
    console.log(row);
    console.log(tableData.value);
    // tableData.value.splice(rowIdx, 1);
    tableData.value = tableData.value
      .filter((item: any, idx) => {
        // console.log(rowIdx, idx);
        if (rowIdx !== idx) {
          return item;
        }
      })
      .map((item: any, idx) => {
        item.idx.content = idx + 1;
        if (item.gName.content) {
          isNewItem.value = false;
        } else {
          isNewItem.value = true;
        }
        return item;
      });
  };

  const newItem = () => {
    if (isNewItem.value) return;

    isNewItem.value = true;

    const item = {
      idx: { content: tableData.value.length + 1, show: true },
      gName: { content: '', show: false },
      gDes: { content: '', show: true },
      gExp: { content: '', show: true },
      gVal: { content: '', show: true },
    };

    tableData.value.push(item as any);

    // debugger

    // refTable.value!.setScrollTop()

    // document.querySelectorAll('.gName1').forEach((item: any) => {
    //   setTimeout(() => {
    //     console.log(item.firstElementChild);
    //     item.firstElementChild.focus();
    //   }, 300);
    // });
  };

  const onblurHandler = (event: any, row: any, cell: any) => {
    // row[cell.prop].show = true
    // debugger;
    console.log('onblurHandler');
    console.log(event.target.value);
    if (!event.target.value && isNewItem.value) {
      tableData.value.pop();
    } else {
      row[cell.prop].content = event.target.value;
      row[cell.prop].show = true;

      console.log(tableData.value);
    }
    isNewItem.value = false;
  };

  const sortMethod = (a: any, b: any) => {
    console.log(a, b);
    if (a.idx.content > a.idx.content) {
      return -1;
    }
  };

  interface User {
    order: number;
    date: string;
    name: string;
    address: string;
    work: {
      year: number;
      seniority: number;
    };
  }

  // const formatter = (row: User, column: TableColumnCtx<User>) => {
  //   return row.address;
  // };

  const tableData2: User[] = [
    {
      order: 1,
      date: '2016-05-03',
      name: 'Tom1',
      address: 'No. 189, Grove St, Los Angeles',
      work: {
        year: 10,
        seniority: 3,
      },
    },
    {
      order: 2,
      date: '2016-05-02',
      name: 'Tom2',
      address: 'No. 189, Grove St, Los Angeles',
      work: {
        year: 10,
        seniority: 3,
      },
    },
    {
      order: 3,
      date: '2016-05-04',
      name: 'Tom3',
      address: 'No. 189, Grove St, Los Angeles',
      work: {
        year: 10,
        seniority: 3,
      },
    },
    {
      order: 4,
      date: '2016-05-01',
      name: 'Tom4',
      address: 'No. 189, Grove St, Los Angeles',
      work: {
        year: 10,
        seniority: 3,
      },
    },
  ];
</script>

<template>
  <div
    :style="{
      width: '800px',
      margin: '50px auto',
      height: '154px',
      overflow: 'auto',
    }"
  >
    <el-table ref="refTable" :data="tableData">
      <el-table-column
        v-for="(cell, idx) in columnList"
        :key="cell.prop"
        :width="cell.width"
        :sortable="cell.prop === 'idx'"
      >
        <template #header>
          <span>{{ cell.label }}</span>
        </template>

        <template #default="{ row }">
          <span
            class="sp-input"
            v-show="row[cell.prop].show"
            @dblclick="(event) => spanDblClickHandler(event, row, cell)"
          >
            {{ row[cell.prop].content }}
          </span>

          <el-input
            v-show="!row[cell.prop].show"
            v-model="row[cell.prop].content"
            :class="`${cell.prop}${idx}`"
            type="text"
            autofocus
            @blur="(event) => onblurHandler(event, row, cell)"
          />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="Operations" width="100">
        <template #default="scope">
          <span
            class="remove-item"
            @click.prevent="deleteRow(scope.$index, scope)"
          >
            Remove
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div :style="{ width: '800px', margin: '50px auto' }">
    <span class="new-item" @click="newItem">New Item</span>
  </div>

  <div
    :style="{
      width: '800px',
      margin: '50px auto',
    }"
  >
    <el-table
      :data="tableData2"
      :default-sort="{ prop: 'date', order: 'ascending' }"
      style="width: 100%"
    >
      <el-table-column prop="order" label="Order" sortable width="100" />
      <el-table-column prop="date" label="Date" sortable width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<style scoped>
  .new-item {
    display: block;
    border: 1px solid #eee;
    cursor: pointer;
  }
  .sp-input {
    display: inline-block;
    width: 50px;
    height: 20px;
  }
  .remove-item {
    cursor: pointer;
  }
</style>
