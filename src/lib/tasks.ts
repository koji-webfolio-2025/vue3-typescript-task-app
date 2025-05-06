import api from './axios';

export interface Task {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get('/tasks');
  return res.data;
};

export const createTask = async (title: string, description: string): Promise<Task> => {
  const res = await api.post('/tasks', { title, description });
  return res.data;
};