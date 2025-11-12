import { apiPost } from './api'
import { LoginCredentials, RegisterData, AuthResponse } from '@/types'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiPost<AuthResponse>('/auth/login', credentials)
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiPost<AuthResponse>('/auth/register', data)
  },

  logout: async (refreshToken: string): Promise<void> => {
    await apiPost<void>('/auth/logout', { refresh_token: refreshToken })
  },

  refreshTokens: async (refreshToken: string): Promise<{ access_token: string; refresh_token: string }> => {
    return apiPost('/auth/refresh', { refresh_token: refreshToken })
  },
}