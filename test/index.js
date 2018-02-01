const ct = require('../index')
async function m(){
  const r = await ct.hasSignedContract('123')
  const r2 = await ct.getExpandContractByUserId('123')
  console.log(r,r2)
}
m()
