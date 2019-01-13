/**
 * 查询一个符合条件的document
 * @param {*} model 
 * @param {Object} params 查询参数
 */
const queryOne = (model, params, projection = {}) => {
  return model.findOne(params, projection).exec();
}

const query = (model, params,  projection = {}) => {
  return model.find(params, projection).exec();
}

module.exports = { queryOne, query }