// src/lib/login.ts
import api from './axios';

export async function login(email: string, password: string) {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });

    if (response.status === 200) {
      return response.data;
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
