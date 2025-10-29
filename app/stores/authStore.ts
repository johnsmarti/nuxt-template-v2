// authStore.ts metodos login, logout, register, forgotPassword, resetPassword, loginIdentity

const authStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    login(user, token) {
      this.user = user;
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
  getters: {
    isAuthenticated: (state) => state.token !== null,
  },
