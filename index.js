 const DBCon = require('./connection').dbs.get('test')
 const ContractModel = require('./contract')(DBCon)
 module.exports = ContractModel