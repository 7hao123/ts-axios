import Axios from './core/Axios'
import { AxiosInstance, AxiosRequestConfig } from './types'
import { extend } from './helpers/utils'
import { defaults } from './defaults'
// 这里是在做什么魔法？？
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 将axios的request绑定到axiosInstance上，所以为了实现函数重载，需要重写request
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
