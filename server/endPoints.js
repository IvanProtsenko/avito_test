const { userModel } = require('../DB/userModel');
const { chatModel } = require('../DB/chatModel');
const { messageModel } = require('../DB/messageModel');
const e = require('express');

const endPoints = (router) => {
    router.post('/users/add', addUser);
    router.post('/chats/add', createChat);
    router.post('/chats/get', getChats);
    router.post('/messages/add', sendMessage);
    router.post('/messages/get', getMessages);

    return router;
}

const addUser = async(req, res) => {
    console.log("addUser");
    try {
        user = await new userModel();
        user.username = req.body.username;
        user.created_at = new Date();
        user.save();
        res.json(user._id);
        res.status(200);
    } catch (e) {
        res.status(202);
        res.json({ err: e.toString() });
    }
}

const createChat = async(req, res) => {
    console.log("createChat");
    try {
        chat = await new chatModel();
        chat.name = req.body.name;
        chat.users = req.body.users;
        chat.created_at = new Date();
        let users = await userModel.find();
        if(users.find(chat.users[0]) && users.find(chat.users[1])) {
            chat.save();
            res.status(200);
            res.json(chat._id);
        }
        else {
            res.status(202);
            res.json({ err: "no such users" });
        }
    } catch (e) {
        res.status(202);
        res.json({ err: e.toString() });
    }
}

const sendMessage = async(req, res) => {
    console.log("sendMessage");
    try {
        if(chatModel.find({id: req.body.chat}) && userModel.find({id: req.body.author})) {
            message = await new messageModel();
            message.chat = req.body.chat;
            message.author = req.body.author;
            message.text = req.body.text;
            message.created_at = new Date();
            message.save();
            res.status(200);
            res.json(message._id);
        }
        else {
            res.status(202);
            res.json({ err: "no such user or chat" });
        }
    } catch (e) {
        res.status(202);
        res.json({ err: e.toString() });
    }
}

const getChats = async(req, res) => {
    console.log("getChats");
    try {
        let user = userModel.find({id: req.body.userId});
        if(user) {
            let allChats = await chatModel.find();
            let chats = [];
            for(let i = 0; i < allChats.length; i++) {
                if(allChats[i].users.indexOf(req.body.userId) != -1) chats.push(allChats[i]);
            }
            res.json(chats);
        }
        else {
            res.status(202);
            res.json({ err: "no such user" });
        }
    } catch (e) {
        console.log(e.toString());
        res.status(202);
        res.json({ err: e.toString() });
    }
}

const getMessages = async(req, res) => {
    console.log("getMessages");
    try {
        let chat = chatModel.find({id: req.body.chatId});
        if(chat) {
            let allMessages = await messageModel.find();
            let messages = [];
            for(let i = 0; i < allMessages.length; i++) {
                if(allMessages[i].chat == req.body.chatId) messages.push(allMessages[i]);
            }
            res.json(messages);
        }
        else {
            res.status(202);
            res.json({ err: "no such chat" });
        }
    } catch (e) {
        res.status(202);
        res.json({ err: e.toString() });
    }
}

module.exports = endPoints;

//--header "Content-Type: application/json" --request POST --data "{\"username\": \"user_1\"}" http://localhost:9000/users/add
//--header "Content-Type: application/json" --request POST --data "{\"name\": \"chat_1\", \"users\": [\"USER_ID_1\", \"USER_ID_2\"]}" http://localhost:9000/chats/add
//--header "Content-Type: application/json" --request POST --data "{\"chat\": \"CHAT_ID\", \"author\": \"USER_ID\", \"text\": \"hi\"}" http://localhost:9000/messages/add
//--header "Content-Type: application/json" --request POST --data "{\"user\": \"USER_ID\"}" http://localhost:9000/chats/get
//--header "Content-Type: application/json" --request POST --data "{\"chat\": \"CHAT_ID\"}" http://localhost:9000/messages/get