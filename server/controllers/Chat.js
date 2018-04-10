const ChatDB = require('../dbDao/Chat')

function createChat({from,to,content}){
    const chatId = [from,to].sort().join('_');
    ChatDB.createChat({chatId,from,to,content});
}

module.exports = {createChat};