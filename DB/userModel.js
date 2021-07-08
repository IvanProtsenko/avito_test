const { mongoose } = require('./config');

const userSchema = mongoose.Schema({ // только get
    id: String,
    username: String,
    created_at: String
});

module.exports.userModel = mongoose.model('user', userSchema);
