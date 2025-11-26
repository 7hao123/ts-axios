const toString = Object.prototype.toString
// 类型谓词？？？
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
// 混合对象实现，首先这个对象是一个函数，其次这个对象包含Axios所有的原型属性和实例属性
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // 这块类型没搞懂
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
