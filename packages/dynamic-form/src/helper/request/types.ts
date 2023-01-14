/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 20:26:04
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 18:12:54
 * @FilePath: /vue-form/src/helper/request/types.ts
 * @Description:
 *
 */
const TYPES = {
  HttpClient: Symbol.for('HttpClient'),
  CustomAxiosOptions: Symbol.for('AxiosOptions'),

  RequestInterceptors: Symbol.for('RequestInterceptors'),
  ResponsetInterceptors: Symbol.for('ResponsetInterceptors'),

  RequestError: Symbol.for('RequestError'),
  RequestExceptionError: Symbol.for('RequestExceptionError'),
  RequestExceptionHandler: Symbol.for('RequestExceptionHandler'),

  ResponseError: Symbol.for('ResponseError'),
  ResponseExceptionError: Symbol.for('ResponseExceptionError'),
  ResponseExceptionHandler: Symbol.for('ResponseExceptionHandler'),
};

export { TYPES };
