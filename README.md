## 安装插件

```bash
$ npm i egg-elasticsearch-ts --save
```

## 开启插件

```js
// {app_root}/config/plugin.js
exports.elasticsearch = {
  enable: true,
  package: 'egg-elasticsearch-ts',
};
```

## 配置
单数据源配置
```js
// {app_root}/config/config.default.js
exports.elasticsearch = {
  node: 'http://127.0.0.1:9200', // 必填
  // node: ['http://127.0.0.1:9200', 'http://127.0.0.1:9300', 'http://127.0.0.1:9400'], // 多节点
  auth: {
    username: '账号',
    password: '密码',
  },
};
```
多数据源配置

```js
// {app_root}/config/config.default.js
exports.elasticsearch = [
  {
    elasticsearchName: 'test01', // elasticsearch 数据源名称
    elasticsearchDefault: true, // 是否默认绑定到 app.elasticsearch 上
    node: 'http://10.10.10.10:9200', // 必填
    // node: ['http://10.10.10.10:9200', 'http://10.10.10.10:9300', 'http://10.10.10.10:9400'],
    auth: {
      username: '账号',
      password: '密码',
    },
  },
  {
    elasticsearchName: 'test02', // elasticsearch 数据源名称
    node: 'http://139.0.0.1:9200', // 必填
    auth: {
      username: '账号',
      password: '密码',
    },
  }
];
```

## 使用
具体使用参考 [@elastic/elasticsearch](https://www.npmjs.com/package/@elastic/elasticsearch)
```js
await this.ctx.elasticsearch.index({
  index: 'test',
  body: {
    title: '标题',
    content: '内容...',
  },
});

// 查询
const result = await this.ctx.elasticsearch.search({
  index: 'test',
  body: {
    query: {
      bool: {
        must: [
          { term: { title: '标题' } }
          {
            bool: {
              should: [
                { match: {  content: '内容' } },
              ],
            },
          }
        ],
      },
    },
  },
});

// 多数据源使用时, test01 和 test02 是 elasticsearchName 配置的名称
const test01Result = await this.ctx.elasticsearchs.test01.search();
const test02Result = await this.ctx.elasticsearchs.test02.search();

```
## License

[BSD-2-Clause](LICENSE)
