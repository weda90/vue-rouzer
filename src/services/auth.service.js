import axios from 'axios';
// import { router } from '@/router';

const API_URL = 'https://dummyjson.com/auth';
const baseUrl = `${import.meta.env.BACKEND_URL}/api`;

class AuthService {
async login(user) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const body = {
      username: user.username,
      password: user.password
    };
        
    return await axios
      .post(API_URL + '/login', body, config)
      .then(response => {
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
