/**
 * 成功返回数据
 * @param {Object} {success, message, data}
 * @param data 内容
 * @param success 请求是否成功
 * @param message 消息
 * @returns Object
 */
function successResponse({message = '操作成功', success = true, data = [], ...others} = {}) {
  return JSON.parse(JSON.stringify({data, success, message, ...others}));
}

/**
 * 失败返回数据
 * @param {Object} {success, message, data}
 * @param data 内容
 * @param success 请求是否成功
 * @param message 消息
 * @returns Object
 */
function failedResponse({message = '操作失败', success = false, data = []} = {}) {
  return JSON.parse(JSON.stringify({data, success, message}));
}

module.exports = { successResponse, failedResponse }
