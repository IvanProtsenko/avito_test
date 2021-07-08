<template>
    <div class="container">
        <button type="button" @click="addUser" class="btn btn-primary btn-lg btn-block" style="margin-top: 5%">Добавить пользователя</button>
        <button type="button" @click="addChat" class="btn btn-primary btn-lg btn-block" style="margin-top: 5%">Добавить чат</button>
        <button type="button" @click="sendMessage" class="btn btn-primary btn-lg btn-block" style="margin-top: 5%">Отправить сообщение</button>
        <button type="button" @click="getChats" class="btn btn-primary btn-lg btn-block" style="margin-top: 5%">Получить список чатов</button>
        <button type="button" @click="getMessages" class="btn btn-primary btn-lg btn-block" style="margin-top: 5%">Получить список сообщений</button>
    </div>
</template>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>

<script>
  export default {
    data: () => ({
        username: "user1",
        chatName: "chat1",
        users: ["user1", "60dd22d03311da4ef0b55e0b"],
        chatId: "60ddfcbcd2283d34044ff6cb",
        userId: "60dd22d03311da4ef0b55e0b",
        text: "Hi!!",

    }),
    methods: {
        async addUser() {
            let user = await this.$store.dispatch('ADD_USER', {
                username: this.username
            });
        },
        async addChat() {
            let chat = await this.$store.dispatch('ADD_CHAT', {
                name: this.chatName,
                users: this.users
            });
        },
        async sendMessage() {
            let message = await this.$store.dispatch('ADD_MESSAGE', {
                chat: this.chatId,
                author: this.userId,
                text: this.text,
            });
        },
        async getChats() {
            let chats = await this.$store.dispatch('GET_CHATS', {
                userId: this.userId
            });
            alert(chats);
        },
        async getMessages() {
            let messages = await this.$store.dispatch('GET_MESSAGES', {
                chatId: this.chatId
            });
            alert(messages);
        },
    }
  }
</script>