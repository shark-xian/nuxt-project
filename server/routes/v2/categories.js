const Router = require('koa-router')
const router = new Router()
const request = require('../../request')
const validator = require('../../middleware/validator')

router.get('/entry', async (ctx, next) => {
  const options = {
    url: 'https://apinew.juejin.im/tag_api/v1/query_category_briefs',
    method: "GET",
    params: {
      show_type: 0
    }
  };
  let { body } = await request(options)
  ctx.body = body
})

/**
 * 获取类目下的标签
 * @param {string} categoryId - 类目id
 * @param {number} limit - 条数
 */
router.post('/tags', validator({
  categoryId: { type: 'string', required: true },
  limit: {
    type: 'string', 
    required: true,
    validator: (rule, value) => Number(value) > 0,
    message: 'limit 需传入正整数'
  }
}), async (ctx, next) => {
  const params = ctx.request.body
  const options = {
    url: 'https://web-api.juejin.im/query',
    method: "POST",
    headers: {
      'X-Agent': 'Juejin/Web',
      'X-Legacy-Device-Id': headers['x-device-id'],
      'X-Legacy-Token': headers['x-token'],
      'X-Legacy-Uid': headers['x-uid']
    },
    body: {
      operationName: "",
      query: "",
      variables: {
        category: params.catagoryId, 
        limit: params.limit || 15
      },
      extensions: {query: {id: "801e22bdc908798e1c828ba6b71a9fd9"}},
    }
  };
  let { body } = await request(options)
  ctx.body = body
})

module.exports = router