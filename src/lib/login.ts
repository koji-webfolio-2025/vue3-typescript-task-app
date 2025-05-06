// src/lib/login.ts
import axios from 'axios';
import api from './axios';

const csrf = () => {
  return axios.get(`${import.meta.env.VITE_API_BASE_ORIGIN}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

export async function login(email: string, password: string) {
  try {
    await csrf();

    const response = await api.post('/login', {
      email,
      password,
    });

    if (response.status === 200) {
      return response.data; // ログイン成功時のユーザー情報など
    } else {
      throw new Error('ログインに失敗しました');
    }
  } catch (error: any) {
    if (error.response && error.response.status === 429) {
      throw new Error('ログイン試行が多すぎます。しばらく待ってください。');
    }
    throw new Error(error.response?.data?.message || 'ログインに失敗しました');
  }
}
