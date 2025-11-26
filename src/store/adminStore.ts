import { create } from "zustand";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

interface AdminState {
  admin: {
    username: string;
    email: string;
  } | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setUsers: (users: User[]) => void;
  updateUserRole: (userId: string, newRole: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: null,
  users: [],
  isAuthenticated: false,
  login: (email) => {
    // Mock login - replace with actual API call
    set({
      admin: { username: "Admin User", email },
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({ admin: null, isAuthenticated: false });
  },
  setUsers: (users) => set({ users }),
  updateUserRole: (userId, newRole) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      ),
    })),
}));
