/** 自定义常用默认异常错误码枚举 */
export enum ErrorTypeEnum {
  ERROR_TYPE_DEFAULT = 999,
  ERROR_TYPE_400 = 4000000,
  ERROR_TYPE_401 = 4010000,
  ERROR_TYPE_403 = 4030000,
  ERROR_TYPE_404 = 4040000
}

/** 常用异常默认信息枚举 */
export enum ErrorValueEnum {
  ERROR_TYPE_DEFAULT = 'server error',
  ERROR_TYPE_400 = '请求参数错误',
  ERROR_TYPE_401 = '授权失败',
  ERROR_TYPE_403 = '禁止访问',
  ERROR_TYPE_404 = '资源未找到'
}
