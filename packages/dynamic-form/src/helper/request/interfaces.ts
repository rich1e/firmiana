/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 20:23:32
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 18:10:26
 * @FilePath: /vue-form/src/helper/request/interfaces.ts
 * @Description:
 *
 */
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';

export interface HttpClient {
  create(config?: CreateAxiosDefaults): AxiosInstance;
}

export interface CustomAxiosOptions {
  merge(options: AxiosRequestConfig): CreateAxiosDefaults;
}

/**
 * 拦截器
 */
export interface HttpInterceptors {
  use(instance: AxiosInstance): void;
}

/**
 * 错误处理逻辑
 */
export interface ExceptionHandler {
  execute(): void;
}

/**
 * 错误信息
 */
export interface ExceptionError {
  throw(): AxiosError;
}
