/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-25 10:16:31
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-26 10:47:52
 */

import { prefixCls } from './constants';
import type { CSSProperties } from 'vue';

type Mold = string | { [key: string]: any };
type Molds = Mold | Mold[];

export type BEMClass = ReturnType<typeof createBEMClass>;

type CreateNamespace = {
  blockName: string;
  bem: (...arg: string[]) => string;
  bemClass: (...arg: string[]) => string;
};

/**
 * @see https://getbem.com/
 *
 * BEM 命名格式
 *
 * <block-name>__<element-name>--<modifier-name>_<modifier_value>
 *
 * 所有实体的命名均使用小写字母，复合词使用连字符 “-” 连接。
 * Block 与 Element 之间使用双下画线 “__” 连接。
 * Mofifier 与 Block/Element 使用双连接符 “--” 连接。
 * modifier-name 和 modifier_value 之间使用单下画线 “_” 连接。
 *
 * 示例：
 *
 * const [prefix, bem, bemClass] = createNameSpace('input', styles);
 *
 * bem() // 'mo-input' 创建块
 *
 * bem('inner') // 'mo-input__inner' 创建元素
 *
 * bem(['disabled']) // 'mo-input mo-input--disabled' 创建块修改器
 * bem({disabled: true}) // 'mo-input mo-input--disabled' 创建块修改器
 * bem(['disabled', 'primary']) // 'mo-input mo-input--disabled mo-input--primary' 创建多个块修改器
 *
 * bem('inner', 'disabled') // 'mo-input__inner mo-input__inner--disabled' 创建元素修改器
 * bem('inner', {disabled: true}) // 'mo-input__inner mo-input__inner--disabled' 创建元素修改器
 * bem('inner', {open: true, active: true}) // 'mo-input__inner mo-input__inner--open mo-input__inner--active' 创建多个元素修改器
 *
 * bemClass 与 bem 的方法和参数均一样，返回值为 CSS Module 风格的 BEM Class 名称。
 *
 * bemClass('scroll', 'max') // '_mo-candidate__scroll_jsj0b_80 _mo-candidate__scroll--max_jsj0b_99'
 */

/**
 * 生成不同个数的修改器
 * @param {String} name
 * @param {Molds} mold
 * @param {CSSProperties} cssModule CSS Module
 * @returns
 */
function genBem(name: string, mold: Molds, cssModule?: CSSProperties): string {
  // 没有 mold，或 mold 为 false， 则返回空
  if (!mold) return '';

  // 如果是字符串，则拼接上 blockName 返回
  if (typeof mold === 'string') {
    const classname = `${name}--${mold}`;
    return cssModule ? ` ${cssModule[classname]}` : ` ${classname}`;
  }

  // 递归处理每个数组元素
  if (Array.isArray(mold)) {
    return (mold as []).reduce(
      (ret, item) => ret + genBem(name, item, cssModule),
      '',
    );
  }

  // 循环对象每一个key，判断 value 是否为真，为真则递归处理 key
  return Object.keys(mold).reduce(
    (ret, key) => ret + (mold[key] ? genBem(name, key, cssModule) : ''),
    '',
  );
}

/**
 * 生成 BEM 风格的 Class 名称
 * @param {String} blockName 组件块名称
 * @param {CSSProperties} cssModule CSS Module
 * @description 结合 CSS Module 和 BEM 规范，保证 CSS 样式隔离和组件 Class 命名语义化
 */
export function createBEMClass(blockName: string, cssModule?: CSSProperties) {
  return (elementName: string, mold: Molds) => {
    // 如果第一个参数不是 el（不是字符串），则设置为 modifier (elementName 只能在第一个参数位置)
    if (elementName && typeof elementName !== 'string') {
      mold = elementName;
      elementName = '';
    }
    // 如果 elementName 为空，则 elementName 为 blockName
    // 反之为 blockName__elementName
    elementName = elementName ? `${blockName}__${elementName}` : blockName;

    // 拼接 blockName，生成带 modifier 的类名
    // return `${elementName}${genBem(elementName, mold)}`;
    return cssModule
      ? `${cssModule[elementName]}${genBem(elementName, mold, cssModule)}`
      : `${elementName}${genBem(elementName, mold)}`;
  };
}

/**
 * 创建命名空间
 * @param {String} name 组件名称
 * @param {CSSProperties} cssModule CSS Module
 * @param {Boolean} prefix 组件命名空间前缀
 */
export function createNamespace(
  name: string,
  cssModule?: CSSProperties,
  prefix = false,
): CreateNamespace {
  const blockName = prefix ? `${name}` : `${prefixCls}-${name}`;

  return {
    blockName,
    bem: createBEMClass(blockName),
    bemClass: createBEMClass(blockName, cssModule),
  } as const;
}
