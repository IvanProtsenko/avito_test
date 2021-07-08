import api from '../../api';

export default {
    state: {},
    mutations: {},
    actions: {
        ADD_CHAT: async (context, args) => {
            try {
                const { data, status } = await api.addChat(args);

                if (status === 200) 
                    return data;
                else return {err: 'Невозможно получить'};
            } catch(e) {return {err:e.toString()}}
        },
        GET_CHATS: async (context, args) => {
            try {
                const { data, status } = await api.getChats(args);

                if (status === 200) 
                    return data;
                else return {err: 'Невозможно получить'};
            } catch(e) {return {err:e.toString()}}
        },
    }
}