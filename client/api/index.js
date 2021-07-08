import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: "http://localhost:9000"
});
apiInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export default {
    async addUser(data) {
        return await apiInstance.post(`/users/add`, data);
    },
    async addChat(data) {
        return await apiInstance.post(`/chats/add`, data);
    },
    async getChats(data) {
        return await apiInstance.post(`/chats/get`, data);
    },
    async sendMessage(data) {
        return await apiInstance.post(`/messages/add`, data);
    },
    async getMessages(data) {
        return await apiInstance.post(`/messages/get`, data);
    },
}