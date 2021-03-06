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
        usersId = [];
        users.forEach(element => {
            usersId.push(element._id);
        });
        if((usersId.indexOf(chat.users[0]) != -1) && (usersId.indexOf(chat.users[1]) != -1)) {
            console.log("saved");
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
        let users = await userModel.find();
        usersId = [];
        users.forEach(element => {
            usersId.push(element._id);
        });
        let chats = await chatModel.find();
        chatsId = [];
        chats.forEach(element => {
            chatsId.push(element._id);
        });
        let author = false, chat = false;
        for(let i = 0; i < usersId.length; i++) { // first used indexOf, but here doesnt work because of strict equality
            if(usersId[i] == req.body.author) author = true;
        }
        for(let i = 0; i < chatsId.length; i++) {
            if(chatsId[i] == req.body.chat) chat = true;
        }
        if(chat && author) {
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
        let user = userModel.find({id: req.body.user});
        if(user) {
            let allChats = await chatModel.find();
            let chats = [];
            let chatUsers;
            for(let i = 0; i < allChats.length; i++) {
                chatUsers = allChats[i].users;
                console.log(chatUsers);
                for(let j = 0; j < 2; j++) {
                    if(chatUsers[j] == req.body.user) chats.push(allChats[i]);
                }
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
        let chat = chatModel.find({id: req.body.chat});
        if(chat) {
            let allMessages = await messageModel.find();
            let messages = [];
            for(let i = 0; i < allMessages.length; i++) {
                if(allMessages[i].chat == req.body.chat) messages.push(allMessages[i]);
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
//--header "Content-Type: application/json" --request POST --data "{\"name\": \"chat_1\", \"users\": [\"60dd22d03311da4ef0b55e0b\", \"60dd23483311da4ef0b55e0c\"]}" http://localhost:9000/chats/add
//--header "Content-Type: application/json" --request POST --data "{\"chat\": \"60ddfd8038eda24dec887ced\", \"author\": \"60dd2294e4d91e30b05ccbed\", \"text\": \"hi\"}" http://localhost:9000/messages/add
//--header "Content-Type: application/json" --request POST --data "{\"user\": \"60dd22d03311da4ef0b55e0b\"}" http://localhost:9000/chats/get
//--header "Content-Type: application/json" --request POST --data "{\"chat\": \"60ddfcbcd2283d34044ff6cb\"}" http://localhost:9000/messages/get
