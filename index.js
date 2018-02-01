 const DBCon = require('./connection').dbs.get(db)
 const ContractModel = require('./contract')(DBCon)
 module.exports = ContractModel