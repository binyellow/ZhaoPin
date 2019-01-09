
const queryOne = async (model, params) => {
  return await model.findOne(params);
}

const query = async (model, params) => {
  return await model.find(params);
}

module.exports = { queryOne, query }