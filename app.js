
const assert = require('assert');
const elasticsearch = require('@elastic/elasticsearch');

/**
 * @param {Egg.Application} app - egg application
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
    let opts = this.app.config.elasticsearch;
    
    assert(typeof opts === 'object', '[egg-elasticsearch-ts] Config must is Object!');

    if(!Array.isArray(opts)){
      Object.assign(opts, { elasticsearchName: 'default', elasticsearchDefault: true })
      opts = [opts];
    }

    const elasticsearchs = {};
    let elasticsearchSingle;
    for (const opt of opts) {
      assert(typeof opt === 'object', `[egg-elasticsearch-ts] Config ‘${opt}’ must is Object!`);
      const {elasticsearchName, elasticsearchDefault, node , nodes } = opt;
      assert(elasticsearchName, '[egg-elasticsearch-ts] Property ‘elasticsearchName’ is required!');
      assert(node || nodes, '[egg-elasticsearch-ts] Missing node(s) option');

      const client = new elasticsearch.Client(opt);
      Object.assign(client, { elasticsearchName, elasticsearchDefault })
      if(!elasticsearchSingle && elasticsearchDefault){
        elasticsearchSingle = client;
      }

      elasticsearchs[elasticsearchName] = client;
    }

    Object.assign(this.app, { elasticsearchs, elasticsearch: elasticsearchSingle });

  }

  async didLoad() {
    
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // 将服务监听的端口发送给agent
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook;