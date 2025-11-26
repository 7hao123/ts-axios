import { AxiosPromise, AxiosRequestConfig } from '../types'
import dispatchRequest from './dispatchRequest'
export default class Axios {
  // 函数重载，需要修改request方法，然后需要把类型全部写成any
  // request(config: AxiosRequestConfig): AxiosPromise {
  //   return dispatchRequest(config)
  // }
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  // 由于get和delete的函数写法很相似，只是方法不同，因此抽出一个函数
  _requestMethodWithoutData(
    method: string,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  _requestMethodWithData(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(Object.assign(config || {}, { method, data, url }))
  }
}
