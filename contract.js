const ModelBuilder = require('./modelBuilder.js');

module.exports = ModelBuilder.build({
  name: 'contract',
  attributes: {user_id: {type: String, required: true, index: true},
    time: {type: Number, required: true},
    type: {type: Number, required: true}, // 合同类型：(1: 用户服务协议)
    request_id: {type: String, required: true}, // 请求id
    order_id: {type: String}, // 签章服务订单id
    contract_id: {type: String}, // 法大大合同id
    download_url: {type: String}, // 合同下载地址
    viewpdf_url: {type: String}, // 合同查看地址
    status: {type: Number, required: true}, // 信息变化状态(0: 生成记录,1: 签章中,2: 签章完成,3: 签章失败)
    extra: {type: Object}
  },

  statics: {
    getExpandContractByUserId: async function (userId) {
      const type = 1;
      const status = 2;
      const query = {user_id: userId, type, status};
      const contract = this.findOne(query);
      return contract;
    },
    hasSignedContract: async function (userId) {
      const contract = await this.getExpandContractByUserId(userId);
      if (contract) return true;
      return false;
    },
    setFail: async function (id, errMsg) {
      const extra = {errMsg};
      const status = 3;
      const update = {$set: {status, extra}};
      const contract = await this.findByIdAndUpdate(id, update, {new: true});
      return contract;
    },
    setSuccess: async function (contract_id, viewpdf_url, download_url) {
      const query = {contract_id};
      const status = 3;
      const update = {$set: {status, viewpdf_url, download_url}};
      const contract = await this.findOneAndUpdate(query, update, {new: true});
      return contract;
    }
  },
  methods: {}
});
