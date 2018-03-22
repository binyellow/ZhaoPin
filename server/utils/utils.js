const utils = require('utility')
function getMd5Pwd(passWord){
    const salt = "huangBin_-.,a;fsk@!#!%^&*()_+";
    return utils.md5(utils.md5(salt+passWord))
}

module.exports = getMd5Pwd