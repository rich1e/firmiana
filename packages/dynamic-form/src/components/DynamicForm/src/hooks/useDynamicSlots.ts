/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-12-01 16:01:05
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-12-20 16:15:27
 * @FilePath: /vue-form/src/components/DynamicForm/src/hooks/useDynamicSlots.ts
 * @Description:
 *
 */
import type { Ref } from 'vue';
import { onMounted, ref, watch } from 'vue';

import type { DynamicFieldsType, FieldType, TabsType } from '../../types';

interface Props {
  field?: FieldType[];
  groups?: FieldType[][];
  tabs?: TabsType;
}

interface GetSlotsParamType extends Props {}

interface UseRenderFields {
  slots: Ref<string[]>;
}

export const filterField = (field: any) => {
  return field
    ?.filter((item: any) => item.control === 'Slots')
    .map((item: any) => item.prop);
};

export const filterGroups = (groups: any) => {
  return groups
    ?.flat()
    ?.filter((item: any) => item.control === 'Slots')
    .map((item: any) => item.prop);
};

const filterTabs = (tabs: TabsType) => {
  let types = '';

  // 找到有数据的直接返回，停止后续遍历
  const fisrt: any = tabs.tabPanes.find((item: any) => {
    const { paneType } = item;
    if (item[paneType]) {
      types = paneType;
      return true;
    }
  });

  return fisrt[types].map((item: any) => item.prop);
};

const getSlots = (param: GetSlotsParamType) => {
  const { field, groups, tabs } = param;

  if (field) return filterField(field);
  if (groups) return filterGroups(groups);
  if (tabs) return filterTabs(tabs);
};
/**
 * 监听 fields 变化，并动态更新 slots
 * @param dynamicFields 动态 fields
 * @param slots slots 数组
 */
export const watchSlots = (
  dynamicFields: DynamicFieldsType,
  slots: Ref<string[]>,
) => {
  watch(dynamicFields, (newVal: any) => {
    const { paneType } = newVal;
    if (paneType === 'biserial' || paneType === 'uniseriate') {
      slots.value = filterField(newVal[paneType]);
    } else if (paneType === 'group') {
      slots.value = filterGroups(newVal[paneType]);
    }
  });
};

/**
 * 动态计算 slots
 * @param props
 * @returns
 */
const useDynamicSlots = (props: Props): UseRenderFields => {
  const slots = ref<string[]>([]);
  const { field, groups, tabs } = props;

  onMounted(() => {
    slots.value = getSlots({ field, groups, tabs });
  });

  return {
    slots,
  };
};

export default useDynamicSlots;
