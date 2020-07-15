const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const router = express.Router()
/**
 * Request
 * req.baseUrl 基础路由地址
 * req.body post发送的数据解析出来的对象
 * req.cookies 客户端发送的cookies数据
 * req.hostname 主机地址 去掉端口号
 * req.ip 查看客户端的ip地址
 * req.ips 代理的IP地址
 * req.originalUrl 对req.url的一个备份
 * req.params 在使用/:id/:name 匹配 params
 * req.path 包含请求URL的路径部分
 * req.protocol http 或 https协议
 * req.query 查询字符串解析出来的对象 username=cloud&password=123 { username:cloud }
 * req.route 当前匹配的路由 正则表达式
 * req.params 获取路由匹配的参数
 * req.get 获取请求header里的参数
 * req.is 判断请求的是什么类型的文件
 * req.param(key名称) 用来获取某一个路由匹配的参数
 * ------------------------------我是木有感情的分割线------------------------------
 * Response
 * res.headersSent 查看http响应是否响应了http头
 * res.append(名称,value) 追加http响应头
 * res.attachment(文件路径) 响应文件请求 
 * res.cookie() 设置cookie
 */

registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

registerInterceptorRouter()

  <<
  << << < HEAD
registerConfigRouter()

  ===
  === = >>>
  >>> > f858d93d6cd53f66f3229c34352b45ba69a277ac
app.use(router)

const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: 'Hello World'
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function (req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function (req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg);
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function (req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function (req, res) {
    res.json({
      msg: 'Hello World'
    })
  })

  router.options('/extend/options', function (req, res) {
    res.end()
  })

  router.delete('/extend/delete', function (req, res) {
    res.end()
  })

  router.head('/extend/head', function (req, res) {
    res.end()
  })

  router.post('/extend/post', function (req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function (req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function (req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function (req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'cloud',
        age: 18
      }
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function (req, res) {
    res.end('hello')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function (req, res) {
    res.json(req.body)
  })
}
