const Router = require('koa-router')
const router = new Router()
const request = require('../../request')
const validator = require('../../middleware/validator')
const config = require('../../request/config')

/**
 * 小册类目
 */
router.get('/channel', async (ctx, next) => {
  const options = {
    url: 'https://xiaoce-timeline-api-ms.juejin.im/v1/getNavList',
    method: 'GET'
  }
  let { body } = await request(options)
  ctx.body = body
})

/**
 * 小册列表
 * @param {string} alias - 类目名
 * @param {number} pageNum
 */
router.get('/getListByLastTime', validator({
  alias: { type: 'string' },
  pageNum: {
    type: 'string', 
    required: true,
    validator: (rule, value) => Number(value) > 0,
    message: 'pageNum 需传入正整数'
  }
}), async (ctx, next) => {
  const options = {
    url: 'https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime',
    method: 'GET',
    params: {
      client_id: config.deviceId,
      src: 'web',
      token: config.token,
      uid: config.uid,
      alias: ctx.query.alias || '',
      pageNum: ctx.query.pageNum || 1
    }
  }
  let { body } = await request(options)
  ctx.body = body
})

module.exports = router