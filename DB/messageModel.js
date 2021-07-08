const { mongoose } = require('./config');

const messageSchema = mongoose.Schema({
    id: String,
    chat: {
        type: mongoose.ObjectId,
        ref: 'chats'
    },
    author: {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    text: String,
    created_at: String
});

module.exports.messageModel = mongoose.model('message', messageSchema);
