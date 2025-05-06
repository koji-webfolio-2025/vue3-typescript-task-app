import api from './axios'

export const logout = async (): Promise<void> => {
  await api.post('/logout')
}
