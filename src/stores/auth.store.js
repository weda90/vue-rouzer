import { defineStore } from "pinia";
import AuthService from "../services/auth.service";
import { useAlertStore } from "@/stores";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  getters: {
    loggedIn: (state) => state.user !== null,
  },
  actions: {
    async login(user) {
      try {
        const response = await AuthService.login(user);
        const alertStore = useAlertStore();

        localStorage.setItem("user", JSON.stringify(response));
        alertStore.clear();

        return response;
      } catch (error) {
        // Handle error here
        const alertStore = useAlertStore();
        alertStore.error(error.response.data.message);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
