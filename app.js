
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
    const opts = this.app.config.elasticsearch;
    console.log('opts----:',opts)
    assert(opts.node || opts.nodes, '[egg-elasticsearch-ts] Missing node(s) option');

    const client = new elasticsearch.Client(opts);

    Object.assign(this.app, { elasticsearch: client });
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