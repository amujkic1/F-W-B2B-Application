import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      user: null, 
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      isSidebarOpen: false,
      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen,
        })),
    }),
    {
      name: 'b2b-app-storage',
    }
  )
)