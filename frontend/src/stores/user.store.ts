import { User } from "@/apis/openapi";
import { userApi } from "@/apis/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
  persist<{
    user: User | null;
    login(user: User): void;
    logout(): Promise<void>;
  }>(
    (set, get) => {
      return {
        user: null,
        token: null,
        login(user) {
          set({ user });
        },
        logout() {
          set({ user: null });
          return userApi.logout();
        },
      };
    },
    {
      name: "user-storage",
      storage: createJSONStorage(() => window?.localStorage),
      onRehydrateStorage() {
        userApi
          .getCurrentUser()
          .then((data) => {
            useUserStore.setState({ user: data.user });
          })
          .catch((err) => {
            console.error(err);
            useUserStore.setState({ user: null });
          });
      },
      skipHydration: true,
    },
  ),
);
