import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { CreatePostModal } from './CreatePostModal'
import { useCreatePostModalStore } from '@/store/createPostModalStore'

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isCreatePostModalOpen, closeCreatePostModal } = useCreatePostModalStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-content mx-auto px-4 py-6">
          <Outlet />
        </main>

        {/* Right Sidebar - Desktop Only */}
        <aside className="hidden xl:block w-80 px-4 py-6">
          <div className="sticky top-20 space-y-4">
            {/* User suggestions section will go here */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Suggestions For You</h3>
              {/* User suggestion items will go here */}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Create Post Modal */}
      {isCreatePostModalOpen && (
        <CreatePostModal onClose={closeCreatePostModal} />
      )}
    </div>
  )
}