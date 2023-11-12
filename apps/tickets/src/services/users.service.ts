import { get } from './api.service';

let users = [];

export interface UserResponse {
  code: number;
  status: 'success' | 'error';
  users: UserDetails[];
}

export interface UserDetails {
  description: string;
  email: string;
  id: number;
  name: string;
}
export const usersService = {
  populateUsers: async () => await get('/admin/ajax/users/*').then((resp) => (users = resp.users)),

  getUserList: async () => {
    if (users.length === 0) await usersService.populateUsers();
    return users;
  }
};
