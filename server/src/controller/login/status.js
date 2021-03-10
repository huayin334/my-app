/**
 * GET
 * 检查登录状态
 */

module.exports = async (ctx) => {
  ctx.body = {
    code: 0,
    data: '已登录',
  }
}
