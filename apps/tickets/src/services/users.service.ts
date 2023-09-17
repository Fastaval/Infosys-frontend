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

export const populateUsers = async () => await get('/admin/ajax/users/*').then((resp) => (users = resp.users));

export const getUserList = async () => {
  if (users.length === 0) await populateUsers();
  return users;
};
