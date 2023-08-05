/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 15:51:00
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 15:52:25
 */
import { create, all } from 'mathjs';

import type { MathJsStatic, ConfigOptions } from 'mathjs';
import type { CustomParser } from '../types';

/**
 * 全局变量表达式计算器
 */
export class GlobalEvaluator {
  private math: MathJsStatic;
  private parser: CustomParser;

  constructor(options: ConfigOptions = {}) {
    /**
     * @see https://mathjs.org/docs/core/configuration.html
     */
    const defaults = {
      epsilon: 1e-12,
      matrix: 'Matrix',
      number: 'BigNumber', // Choose 'number' (default), 'BigNumber', or 'Fraction'
      precision: 64, // 64 by default, only applicable for BigNumbers
      predictable: false,
      randomSeed: null,
    };

    const settings = Object.assign({}, defaults, options);

    this.math = create(all, settings);
    this.parser = this.math.parser() as CustomParser;
  }

  /**
   * 获取 mathjs 方法名
   * @returns
   */
  static getMathJSMethodByName() {
    const methods: any[] = [];
    const config = {};
    const math: any = create(all, config);
    for (const fn in math) {
      if (typeof math[fn] === 'function' && fn.length < 6) {
        methods.push({
          type: 1,
          name: `${fn}()`,
        });
      }
    }
    return methods;
  }

  /**
   * 获取表达式
   * @param key
   * @returns
   */
  get(key: string) {
    return this.parser.get(key);
  }

  /**
   * 设置表达式
   * @param key
   * @param value
   */
  set(key: string, value: any) {
    this.parser.set(key, value);
  }

  /**
   * 移除表达式
   * @param key
   */
  remove(key: string) {
    this.parser.remove(key);
  }

  /**
   * 获取全部表达式
   * @returns
   */
  getAll() {
    return this.parser.getAll();
  }

  /**
   * 计算表达式
   * @param {String} expr 表达式
   * @returns
   */
  computed(expr: string) {
    try {
      return this.parser.evaluate(expr);
    } catch (error) {
      throw new Error('表达式计算错误');
    }
  }
}
