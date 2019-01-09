const create = async (model, params) => {
  return await model.create(params)
}

module.exports = create