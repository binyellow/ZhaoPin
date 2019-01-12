/**
 * 查询一个符合条件的document
 * @param {*} model 
 * @param {Object} params 查询参数
 */
const queryOne = (model, params) => {
  return model.findOne(params).exec();
}

const query = (model, params) => {
  return model.find(params).exec();
}

module.exports = { queryOne, query }