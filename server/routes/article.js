const Router = require('koa-router')
const router = new Router()
const request = require('../request')
const config = require('../request/config')

router.get('/detail', async (ctx,next)=>{
  const options = {
    url: 'https://post-storage-api-ms.juejin.im/v1/getDetailData',
    method: "GET",
    params: {
      uid: config.uid,
      device_id: config.deviceId,
      token: config.token,
      src: 'web',
      type: ctx.query.type,
      postId: ctx.query.postId
    }
  };
  const data = await request(options);
  ctx.body = data;
})

router.get('/indexList', async (ctx, next) => {
  ctx.set('Cache-Control', 'max-age=60')
  const options = {
    url: 'https://web-api.juejin.im/query',
    method: "POST",
    headers: {
      'X-Agent': 'Juejin/Web',
      'X-Legacy-Device-Id': config.deviceId,
      'X-Legacy-Token': config.token,
      'X-Legacy-Uid': config.uid
    },
    body: { 
      "operationName": "", 
      "query": "", 
      "variables": { 
        "first": ctx.query.first || 20, 
        "after": ctx.query.after || '',
        "order": ctx.query.order || "POPULAR"
      }, 
      "extensions": { "query": { "id": "21207e9ddb1de777adeaca7a2fb38030" } } 
    }
  };
  ctx._data = await request(options)
  next()
  ctx.body = ctx._data;
}, async (ctx) => {
  let data = {}
  let res = JSON.parse(ctx._data)
  if(res.data && res.data.articleFeed){
    data.pageInfo = res.data.articleFeed.items.pageInfo
    // 获取文章id
    data.list = res.data.articleFeed.items.edges.map(item=>{
      let artic_id = item.node.originalUrl.split('/').pop()
      return {
        ...item.node,
        artic_id
      }
    })
  }else{
    data = res
  }
  ctx._data = data
})

module.exports = router