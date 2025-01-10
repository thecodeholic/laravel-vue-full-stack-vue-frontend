import {defineStore} from "pinia";
import axiosClient from "../axios.js";

export const useUserStore = defineStore('currentUser', {
  state: () => ({
    user: {
      name: 'Zura',
      email: 'Zura@example.com',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    // token: '1234',
    // user: null,
    // token: null
  }),
  actions: {
    fetchUser() {
      return axiosClient.get('/api/user').then(({data}) => {
        this.user = data;
        return data;
      })
    },
    login(user) {
      return axiosClient.get('/sanctum/csrf-cookie').then(response => {
        return axiosClient.post('/login', user)
          .then(({data}) => {
            this.user = data.user;
            // this.token = data.token;
            // sessionStorage.setItem('token', data.token)
            return data;
          })
      });

    },
    logout() {
      return axiosClient.post('/logout').then(() => {
        this.user = null;
        // this.token = null;
        // sessionStorage.removeItem('token')
      })
    }
  }
})