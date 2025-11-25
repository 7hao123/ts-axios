import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'
import { buildURL } from './helpers/url'
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}
function processConfig(config: AxiosRequestConfig) {
  // 对config里面的url进行处理
  config.url = transformURL(config)
  // 必须先处理headers
  config.headers = transformHeaders(config)
  config.data = transformData(config)
}

function transformURL(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}

function transformData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  // 没有设置headers做默认值处理
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
