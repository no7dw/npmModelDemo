const assert = require('assert')
const ctModel = require('../index')
describe('get db record', ()=>{
  it('get one exists record', async()=> {
    const user_id = '123'
    const r = await ctModel.hasSignedContract(user_id)
    const r2 = await ctModel.getExpandContractByUserId(user_id)
    if(r == true)
      assert.equal(r2.user_id,user_id)
  })
})

