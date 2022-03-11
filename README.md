# 云api请求中间层服务
代理云api三个环境的请求服务，配合[sim-tea-app](https://git.code.oa.com/enbox/sim-tea-app)本地开发请求联调环境。减少了配置代理的麻烦。

## [签名方法使用V3](https://cloud.tencent.com/document/product/213/30654#NodeJS)

```
# 安装依赖
npm install

# 允许开发环境 127.0.0.1:3000
npm run start

# 构建
npm run build
```

## 参数
- **environment** 请求云api环境，"product", "dev", "test"
- **serviceType** 请求云API业务名称，如：cvm
- **cmd**  请求云api对外接口名称，如：DescribeRegions
- **region** 请求云api地域名称，如："ap-shanghai"
- **version** 接口版本，如："2017-03-12"
- **data** 请求云api请求参数

## 请求示例
```js
const requestInfo ={
	environment: "dev",
	serviceType: "cvm",
	cmd: "DescribeZones",
	region: "ap-shanghai",
	version: "2017-03-12",
	data:{}
}

axios.post('http://127.0.0.1:3000/capi', requestInfo).then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
);
```

## 配置环境密钥
由于开发环境，测试环境，现网环境 三个环境的密钥是不通用的 所以使用要在```config.ts```文件中进行配置

[各环境可用API秘钥说明](http://tapd.oa.com/qcloud_api/markdown_wikis/show/#1210161711000428729)
```js
export const SECRET_CONFIG = {
  // 现网
  product: {
    id: "AKIDz8krbsJ5yKBZQpn74WFkmLPx3*******",
    key: "Gu5t9xGARNpq86cd98joQYCN3*******",
  },
  // 开发
  dev: {
    id: "AKIDz8krbsJ5yKBZQpn74WFkmLPx3*******",
    key:"Gu5t9xGARNpq86cd98joQYCN3*******",
  },
  // 测试
  test: {
    id: "AKIDz8krbsJ5yKBZQpn74WFkmLPx3*******",
    key: "Gu5t9xGARNpq86cd98joQYCN3*******",
  }
}
```