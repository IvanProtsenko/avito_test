const { mongoose } = require('./config');

const chatSchema = mongoose.Schema({ // только get
    id: String,
    name: String,
    users: [String],
    created_at: String
});

module.exports.chatModel = mongoose.model('chat', chatSchema);
