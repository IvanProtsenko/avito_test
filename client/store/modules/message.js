import api from '../../api';

export default {
    state: {},
    mutations: {},
    actions: {
        ADD_MESSAGE: async (context, args) => {
            try {
                const { data, status } = await api.sendMessage(args);

                if (status === 200) 
                    return data;
                else return {err: 'Невозможно получить'};
            } catch(e) {return {err:e.toString()}}
        },
        GET_MESSAGES: async (context, args) => {
            try {
                const { data, status } = await api.getMessages(args);

                if (status === 200) 
                    return data;
                else return {err: 'Невозможно получить'};
            } catch(e) {return {err:e.toString()}}
        },
    }
}