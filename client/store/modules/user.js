import api from '../../api';

export default {
    state: {},
    mutations: {},
    actions: {
        ADD_USER: async (context, args) => {
            try {
                const { data, status } = await api.addUser(args);

                if (status === 200) 
                    return data;
                else return {err: 'Невозможно получить'};
            } catch(e) {return {err:e.toString()}}
        },
    }
}