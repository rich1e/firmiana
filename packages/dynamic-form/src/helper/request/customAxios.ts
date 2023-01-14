/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 19:43:51
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 18:32:25
 * @FilePath: /vue-form/src/helper/request/customAxios.ts
 * @Description:
 *
 */
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

import 'reflect-metadata';
import { injectable, unmanaged } from 'inversify';
import type { HttpClient } from './interfaces';

@injectable()
class CustomAxiosHttpClient implements HttpClient {
  /**
   * @see https://blog.csdn.net/zhangyr_student/article/details/119421467
   * @see https://blog.51cto.com/u_15242344/2841917
   */
  private axiosInstance!: AxiosInstance;

  /**
   *
   * @param options
   * @see https://doc.inversify.cloud/zh_cn/inheritance.html
   * @see https://fynn90.github.io/2021/02/18/InversifyJS/
   * @see http://febeacon.com/inversifyjs_docs_cn/
   */
  constructor(@unmanaged() options: AxiosRequestConfig) {
    this.init(options);
  }

  private init(options: AxiosRequestConfig) {
    const settings = this.CustomOptions(options);
    this.axiosInstance = axios.create(settings);

    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response?.status === 200) {
          return response.data;
        }
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }

  /**
   * 自定义请求配置
   * @param options
   * @returns
   */
  private CustomOptions(options: AxiosRequestConfig) {
    const defaultOpions: AxiosRequestConfig = {
      baseURL: '',
      timeout: 5000,
      withCredentials: true,
    };

    return Object.assign({}, defaultOpions, options);
  }

  create() {
    return this.axiosInstance;
  }
}

export { CustomAxiosHttpClient };
