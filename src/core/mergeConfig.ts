import { isPlainObject, deepMerge } from '../helpers/utils'
import { AxiosRequestConfig } from '../types'

const strats = Object.create(null)

function defaultStrat(val1: any, val2: any) {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any) {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  }
}

const stratKessDeepMerge = ['headers']

stratKessDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

// 用来合并用户的defaults config
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  //   用来承载返回的config
  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  return config

  function mergeField(key: string): void {
    // 这个函数的功能，用一个strat,实现 config[key] = strat(config1[key],config2[key])
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
}
