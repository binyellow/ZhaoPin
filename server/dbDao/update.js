const updateOne = (model, conditions, params) => {
  return model.updateOne(conditions, params).exec();
}

module.exports = { updateOne }