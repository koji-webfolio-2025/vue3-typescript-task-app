// login.ts
import api from './axios';

export async function login(email: string, password: string) {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });

    // トークンを取得したら Authorization ヘッダーに自動で付与させる
    const token = response.data.token;
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'ログインに失敗しました');
  }
}
