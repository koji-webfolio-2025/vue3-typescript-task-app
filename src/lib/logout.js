import api from './axios';
export const logout = async () => {
    await api.post('/logout');
};
