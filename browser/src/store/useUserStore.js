import create from 'zustand';

const useUserStore = create((set) => ({
  currentUser: null,
  loading: false,
  userForm: {
    email: '',
    password: '',
    repeat_password: '',
    firstName: '',
    lastName: '',
    profilepic: '',
    isadmin: false,
  },
  setUserFormData: (data) => set((state) => ({
    userForm: { ...state.userForm, ...data },
  })),
  registerUser: async () => {
    set({ loading: true });
    try {
      // Simulate a registration API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      set({ currentUser: { email: state.userForm.email }, loading: false });
    } catch (error) {
      console.error("Registration failed:", error);
      set({ loading: false });
    }
  },
}));

export { useUserStore };