/*
 * @Author       : yuqigong@outlook.com
 * @Date         : 2023-06-29 10:13:48
 * @LastEditors  : yuqigong@outlook.com
 * @LastEditTime : 2023-07-05 18:25:09
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
