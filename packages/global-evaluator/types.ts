/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-07-28 15:51:00
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-28 15:51:42
 */

import type { Parser } from 'mathjs';

export type GlobalParam = {
  name: string;
  val?: string;
  exp?: string;
  desc?: string;
};

export type CustomParser = Parser & {
  remove: (variable: string) => void;
};

export type Keywords = {
  key: string;
  code: string;
  expr: string;
  target: HTMLElement;
};

export type GlobalParamWithList = GlobalParam & {
  type: number;
};
