import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Layout } from '@/components/Layout'

// Pages
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Profile } from '@/pages/Profile'
import { Explore } from '@/pages/Explore'
import { Messages } from '@/pages/Messages'
import { Notifications } from '@/pages/Notifications'
import { Settings } from '@/pages/Settings'
import { PostDetail } from '@/pages/PostDetail'

export function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="p/:postId" element={<PostDetail />} />
        </Route>

        {/* 404 route */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  )
}