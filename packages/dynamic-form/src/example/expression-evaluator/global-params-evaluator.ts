import { computed } from 'vue';
/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-06 13:38:06
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-06-06 16:02:06
 */

import { create, all, ConfigOptions, MathJsStatic, format } from 'mathjs';

/**
 * const geval = new GlobalParamsEvaluator();
 *
 * geval.add();
 * geval.set();
 * geval.computed('0.1 + 0.2')
 *
 * geval.setScope();
 * geval.import();
 * geval.checked();
 */
export default class GlobalParamsEvaluator {
  math: MathJsStatic | null = null;
  scoped: any | null = null;
  expressions: any = {};

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
  }

  /**
   * 设置表达式对象
   * @param params
   */
  set(params: Object) {
    this.expressions = Object.assign(this.expressions, params);
  }

  add(key: string, exp: string) {
    this.expressions[key] = exp;
  }

  remove(key: string) {
    delete this.expressions[key];
  }

  clear() {
    this.expressions = {};
  }

  /**
   * 配置内置变量或函数
   * @param scope
   */
  setScope(scope: Object) {
    this.scoped = scope;
  }

  /**
   * 为 mathjs 动态注入变量或函数
   * @param override
   * @returns
   */
  import(override: boolean = false) {
    if (!this.scoped) return;
    /**
     * @see https://mathjs.org/examples/import.js.html
     */
    this.math?.import(this.scoped, { override });
  }

  /**
   * 计算表达式
   * @see https://github.com/josdejong/mathjs/issues/2863
   * @see https://github.com/josdejong/mathjs/issues/789
   * @see https://github.com/josdejong/mathjs/issues/482
   * @param expression
   * @returns
   */
  computed(expression: string) {
    if (!this.scoped || !expression) return;
    return this.math?.evaluate(expression, this.scoped);
  }

  checked(expressions: any[]) {
    const res: any[] = [],
      errs: any[] = [];
    expressions.forEach((item: any, idx: any) => {
      try {
        const key = Object.keys(item)[0];
        const val = this.computed(item[key]);
        res.push({ val, idx });
      } catch (error) {
        if (error) {
          errs.push({ exp: item, idx });
        }
      }
    });
    return {
      res: errs.length === 0 ? res : errs,
      checked: errs.length === 0,
    };
  }
}

export function print(value: any) {
  console.log(format(value));
}

/**
 * 查找以 expre_ 开头的属性和值
 * @param json
 * @returns
 */
export const findExprePropertys = (json: any) => {
  const regex = /("expre_[^"]+"):\s*"([^"]*)"/g;
  const expres: any[] = [];
  let matches;
  const format = JSON.stringify(json);
  while ((matches = regex.exec(format))) {
    const property = matches[1];
    const value = matches[2];
    // console.log("Property:", property);
    // console.log("Value:", value);
    if (value && Number.isNaN(parseInt(value))) {
      const obj: any = {};
      obj[property] = value;
      expres.push(obj);
    }
  }
  return expres;
};

export const findGlobleParam = (json: any) => {
  return json.data.tree.attrs.configGlobleParam;
};

export const findExpObj = (json: any) => {
  return json.data.tree.attrs.exp_obj;
};

export const formatGlobal = (data: any[]) => {
  const obj = {} as any;
  data.forEach((item) => {
    const { globleParamKey, globleParamValue } = item;
    obj[globleParamKey] = globleParamValue + '';
  });
  return obj;
};
