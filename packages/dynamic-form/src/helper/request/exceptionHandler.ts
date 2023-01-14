/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-08 18:06:34
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 18:08:29
 * @FilePath: /vue-form/src/helper/request/exceptionHandler.ts
 * @Description:
 *
 */
import 'reflect-metadata';
import type { AxiosError } from 'axios';
import { injectable, inject } from 'inversify';

import { TYPES } from './types';
import { ExceptionError, ExceptionHandler } from './interfaces';

@injectable()
export class RequestExceptionHandler implements ExceptionHandler {
  private _err: AxiosError;

  constructor(@inject(TYPES.RequestError) error: AxiosError) {
    this._err = error;
  }

  execute() {
    return Promise.reject(this._err);
  }
}

@injectable()
export class ResponseExceptionHandler implements ExceptionHandler {
  private _err: AxiosError;

  constructor(@inject(TYPES.ResponseExceptionError) error: AxiosError) {
    this._err = error;
  }

  execute() {
    return Promise.reject(this._err);
  }
}
