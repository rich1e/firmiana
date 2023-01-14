/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-08 18:12:04
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 18:25:27
 * @FilePath: /vue-form/src/helper/request/httpInterceptors.ts
 * @Description:
 *
 */
import 'reflect-metadata';
import { inject, injectable, LazyServiceIdentifer } from 'inversify';
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

import { TYPES } from './types';
import { HttpInterceptors } from './interfaces';
import {
  RequestExceptionHandler,
  ResponseExceptionHandler,
} from './exceptionHandler';

@injectable()
export class RequestInterceptors implements HttpInterceptors {
  private _requestExceptionHandler: RequestExceptionHandler;

  constructor(
    @inject(new LazyServiceIdentifer(() => TYPES.RequestExceptionHandler))
    requestExceptionHandler: RequestExceptionHandler,
  ) {
    this._requestExceptionHandler = requestExceptionHandler;
  }

  RequestInterceptorsError() {
    this._requestExceptionHandler.execute();
  }

  use(instance: AxiosInstance) {
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    }, this.RequestInterceptorsError);
  }
}

@injectable()
export class ResponsetInterceptors implements HttpInterceptors {
  private _responseExceptionHandler: ResponseExceptionHandler;

  constructor(
    @inject(TYPES.ResponsetInterceptors)
    responseExceptionHandler: ResponseExceptionHandler,
  ) {
    this._responseExceptionHandler = responseExceptionHandler;
  }

  ResponsetInterceptorsError() {
    this._responseExceptionHandler.execute();
  }

  use(instance: AxiosInstance) {
    instance.interceptors.response.use((response: AxiosResponse) => {
      if (response?.status === 200) {
        return response.data;
      }
    }, this.ResponsetInterceptorsError);
  }
}
