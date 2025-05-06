import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
    state: () => ({
        name: '',
        email: '',
        isLoggedIn: false,
    }),
    actions: {
        setUser(user) {
            this.name = user.name;
            this.email = user.email;
            this.isLoggedIn = true;
        },
        clearUser() {
            this.name = '';
            this.email = '';
            this.isLoggedIn = false;
        },
    },
    persist: true,
});
