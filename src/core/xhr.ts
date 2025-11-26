import { parseHeaders } from '../helpers/header'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      // readyState是4说明正确触发了
      if (request.readyState !== 4) {
        return
      }

      // 处理response
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 这里有问题headers是string类型不方便查看，
      // 除此之外还需要传responseType='json'否则返回值是text
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      // resolve(response),改成方法
      handleResponse(response)
    }

    request.onerror = function handleError() {
      // reject(new Error('NetWork Error!'))
      reject(createError('NetWork Error!', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      // reject(new Error(`超市${timeout}`))
      reject(createError(`Timeout of ${timeout} ms`, config, 'ECONNABORTED', request))
    }

    // 在open之后设置headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}`))
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
