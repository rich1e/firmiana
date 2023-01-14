/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 19:18:56
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 17:49:17
 * @FilePath: /vue-form/src/helper/request/inversify.config.ts
 * @Description:
 *
 */
import { Container } from 'inversify';
import { TYPES } from './types';
import { HttpClient } from './interfaces';
import { CustomAxiosHttpClient } from './customAxios';

const httpContainer = new Container();
httpContainer.bind<HttpClient>(TYPES.HttpClient).to(CustomAxiosHttpClient);

export { httpContainer };
