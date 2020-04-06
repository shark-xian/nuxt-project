/**
 * 参数验证中间件
 * 使用规则参考 async-validator
 */

const { default: Schema } = require('async-validator')

module.exports = function (descriptor) {
  return async function (ctx, next) {
    let validator = new Schema(descriptor)
    let params = {}
    Object.keys(descriptor).forEach(key => {
      if (ctx.method === 'GET') {
        params[key] = ctx.query[key] || ''
      } else if (ctx.method === 'POST') {
        params[key] = ctx.request.body[key] || ''
      }
    })
    ctx.$errors = await validator.validate(params)
      .then(() => null)
      .catch(err => err.errors)
    await next()
  }
}