import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserForm = {
    name: string;
    email: string;
};

type UserStore = {
    user: UserForm | null;
    setUser: (user: UserForm) => void;
    clearUser: () => void;
};

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage', // Unique name for the storage
        },
    ),
);

export default useUserStore;
