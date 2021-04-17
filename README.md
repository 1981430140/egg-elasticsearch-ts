## 安装插件

```bash
$ npm i egg-elasticsearch-ts --save
```

## 开启插件

```js
// {app_root}/config/plugin.js
exports.elasticsearch = {
  enable: true,
  package: "egg-elasticsearch-ts",
};
```

## 配置

```js
// {app_root}/config/config.default.js
exports.elasticsearch = {
  node: "http://127.0.0.1:9200", // 必填
  auth: {
    username: '账号',
    password: '密码',
  },
};
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

```
## License

[BSD-2-Clause](LICENSE)
