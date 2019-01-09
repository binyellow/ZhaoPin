/**
 * 成功返回数据
 * @param {Object} {success, message, content}
 * @param content 内容
 * @param success 请求是否成功
 * @param message 消息
 * @returns Object
 */
function successResponse({message = '操作成功', success = true, content = {}, ...others} = {}) {
  return JSON.parse(JSON.stringify({content, success, message, ...others}));
}

/**
 * 失败返回数据
 * @param {Object} {success, message, content}
 * @param content 内容
 * @param success 请求是否成功
 * @param message 消息
 * @returns Object
 */
function failedResponse({message = '操作失败', success = false, content = {}} = {}) {
   JSON.parse(JSON.stringify({content, success, message}));
}

module.exports = { successResponse, failedResponse }
