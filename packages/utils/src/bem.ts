/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-25 10:16:31
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 17:42:54
 */
import { prefixCls } from './constants';
import type { CSSProperties } from 'vue';

type Mold = string | { [key: string]: any };
type Molds = Mold | Mold[];

/**
 * @see https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
 */
type CSSValue = keyof CSSProperties;

export type BEMClass = ReturnType<typeof createBEMClass>;

type CreateNamespace = {
  /** 组件名称，包含命名空间 e.g. fir-input-expression */
  blockName: string;
  /** BEM 风格的 Class 名称 */
  bemClass: (...arg: string[]) => string;
  /** BEM 风格的 CSS Modules 名称 */
  bemCSSModule: (...arg: string[]) => string;
};

/**
 * @see https://getbem.com/
 * @see https://en.bem.info/methodology/css/
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
 * 示例 1：
 *
 * const [blockName, bemClass] = createNameSpace('input');
 *
 * bemClass() // 'fir-input' 创建块
 *
 * bemClass('inner') // 'fir-input__inner' 创建元素
 *
 * bemClass(['disabled']) // 'fir-input fir-input--disabled' 创建块修改器
 * bemClass({disabled: true}) // 'fir-input fir-input--disabled' 创建块修改器
 * bemClass(['disabled', 'primary']) // 'fir-input fir-input--disabled fir-input--primary' 创建多个块修改器
 *
 * bemClass('inner', 'disabled') // 'fir-input__inner fir-input__inner--disabled' 创建元素修改器
 * bemClass('inner', {disabled: true}) // 'fir-input__inner fir-input__inner--disabled' 创建元素修改器
 * bemClass('inner', {open: true, active: true}) // 'fir-input__inner fir-input__inner--open fir-input__inner--active' 创建多个元素修改器
 *
 * 示例 2：
 *
 * const [blockName, bemClass, bemCSSModule] = createNameSpace('input', cssModule);
 *
 * bemClass 与 bemCSSModule 的方法和参数均一样，返回值为 CSS Module 风格的 BEM Class 名称。
 *
 * bemCSSModule('scroll', 'max') // '_fir-candidate__scroll_jsj0b_80 _fir-candidate__scroll--max_jsj0b_99'
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
    return cssModule ? ` ${cssModule[classname as CSSValue]}` : ` ${classname}`;
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
      ? `${cssModule[elementName as CSSValue]}${genBem(
          elementName,
          mold,
          cssModule,
        )}`
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
    bemClass: createBEMClass(blockName),
    bemCSSModule: createBEMClass(blockName, cssModule),
  } as const;
}
