/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-08 11:02:14
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 11:06:24
 * @FilePath: /vue-form/src/helper/request/index.ts
 * @Description:
 *
 */
import { HttpClient } from './interfaces';
import { httpContainer } from './inversify.config';
import { TYPES } from './types';

export const httpClient = httpContainer.get<HttpClient>(TYPES.HttpClient);
