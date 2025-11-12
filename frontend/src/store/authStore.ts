import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthTokens, LoginCredentials, RegisterData } from '@/types'
import { authApi } from '@/services/authApi'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  tokens: AuthTokens | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshTokens: () => Promise<void>
  clearError: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      tokens: null,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null })
          const response = await authApi.login(credentials)

          set({
            user: response.user,
            tokens: {
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            },
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error: any) {
          set({
            error: error.message || 'Login failed',
            isLoading: false,
          })
          throw error
        }
      },

      register: async (data: RegisterData) => {
        try {
          set({ isLoading: true, error: null })
          const response = await authApi.register(data)

          set({
            user: response.user,
            tokens: {
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            },
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error: any) {
          set({
            error: error.message || 'Registration failed',
            isLoading: false,
          })
          throw error
        }
      },

      logout: async () => {
        try {
          const { tokens } = get()
          if (tokens) {
            await authApi.logout(tokens.refreshToken)
          }
        } catch (error) {
          // Continue with logout even if API call fails
          console.error('Logout API error:', error)
        } finally {
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        }
      },

      refreshTokens: async () => {
        try {
          const { tokens } = get()
          if (!tokens?.refreshToken) {
            throw new Error('No refresh token available')
          }

          const newTokens = await authApi.refreshTokens(tokens.refreshToken)

          set({
            tokens: {
              accessToken: newTokens.access_token,
              refreshToken: newTokens.refresh_token,
            },
          })
        } catch (error: any) {
          // If refresh fails, log out the user
          set({
            user: null,
            tokens: null,
            isAuthenticated: false,
            error: 'Session expired. Please login again.',
          })
          throw error
        }
      },

      clearError: () => set({ error: null }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)