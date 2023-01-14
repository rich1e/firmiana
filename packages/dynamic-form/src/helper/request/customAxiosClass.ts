/*
 * @Author: yuqigong@outlook.com
 * @Date: 2022-11-07 19:43:51
 * @LastEditors: yuqigong@outlook.com
 * @LastEditTime: 2022-11-08 16:40:34
 * @FilePath: /vue-form/src/helper/request/customAxiosClass.ts
 * @Description:
 *
 */
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
import axios from 'axios';

class CustomAxiosHttpClientClass {
  private axiosInstance!: AxiosInstance;

  constructor(options: CreateAxiosDefaults) {
    this.init(options);
  }

  private init(options: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(options);

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

  create() {
    return this.axiosInstance;
  }
}

export { CustomAxiosHttpClientClass };
