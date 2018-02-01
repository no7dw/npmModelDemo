const config = require('config');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

const createMongodbConnection = Symbol('创建mongodb连接');

class Connection {
  constructor () {
    const mongoConfigs = config.get('database.mongodb');
    // const DEBUG_FLAG = config.get('database.mongoDebug');

    const mongoose = require('mongoose');
    mongoose.Promise = bluebird;
    this.dbs = new Map();
    // this.dbs.set('test', this[createMongodbConnection]('mongodb://localhost:27017'))
    for (let c of mongoConfigs) {
      this.dbs.set(c.name, this[createMongodbConnection](c.url, c.options));
    }

  }

  [createMongodbConnection] (url, options = {}) {
    const db = mongoose.createConnection(url, options);

    db.on('error', err => {
      err.message = `[mongoose]${err.message}`;
      console.log(err);
  });

    db.on('disconnected', () => {
      console.log(`[mongoose] ${url} disconnected`);
  });

    db.on('connected', () => {
      console.log(`[mongoose] ${url} connected successfully`);
  });

    db.on('reconnected', () => {
      console.log(`[mongoose] ${url} reconnected successfully`);
  });

    return db;
  }
}

module.exports = new Connection();
