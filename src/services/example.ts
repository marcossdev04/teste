import api from './api';

interface User {
  id: number;
  name: string;
  email: string;
}

export const userService = {
  async getUser(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await api.post('/users', userData);
    return response.data;
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  }
};
