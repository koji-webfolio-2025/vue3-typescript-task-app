import api from './axios';
export const fetchTasks = async () => {
    const res = await api.get('/tasks');
    return res.data;
};
export const createTask = async (title, description) => {
    const res = await api.post('/tasks', { title, description });
    return res.data;
};
