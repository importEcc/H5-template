
// 环境变量
const ENV = process.env.NODE_ENV;

/**
 * 项目启动配置
 * publicPath 项目根路径
 * host 本机host
 * port 本机端口
 * proxy webpack代理
 */
const config = {
  publicPath: '/h5-template/',
  isNeedConsole: false
}

module.exports = {
  publicPath: config.publicPath,
  isNeedConsole: config.isNeedConsole,
  baseUrl: getBaseUrl()
}

// 获取接口前缀地址
function getBaseUrl() {
  let baseUrl = '' // 接口前缀
  switch (ENV) {
      // 开发环境
      case 'development':
          baseUrl = ''
          // baseUrl =  'http://test.kaoshibao.tiaotukaoyan.com'; // 测试环境
          break
      // 测试打包
      case 'test':
          baseUrl = 'http://test.kaoshibao.tiaotukaoyan.com/'
          break
      // 正式打包
      case 'production':
          baseUrl = 'https://kaoshibao.tiaotukaoyan.com/'
          break
      default:
          baseUrl = ''
          break
  }
  return {
      baseUrl
  }
}

