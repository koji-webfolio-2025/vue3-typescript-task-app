// src/lib/login.ts
import axios from 'axios';

export async function login(email: string, password: string) {
  try {
    const response = await axios.post('http://localhost:8000/api/login', {
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
