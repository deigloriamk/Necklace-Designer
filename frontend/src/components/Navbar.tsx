import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { useCreatePostModalStore } from '@/store/createPostModalStore'

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { openCreatePostModal } = useCreatePostModalStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleCreatePost = () => {
    openCreatePostModal()
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    setShowUserMenu(false)
  }

  const goToProfile = () => {
    navigate(`/profile/${user?.username}`)
    setShowUserMenu(false)
  }

  const goToMessages = () => {
    navigate('/messages')
    setShowUserMenu(false)
  }

  const goToNotifications = () => {
    navigate('/notifications')
  }

  const goToSettings = () => {
    navigate('/settings')
    setShowUserMenu(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-primary-600">
              ChatterZbox
            </Link>
          </div>

          {/* Center section - Search bar */}
          <div className="hidden md:block flex-1 max-w-xs mx-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right section - Navigation icons */}
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <HomeIcon className="w-6 h-6" />
            </Link>

            <Link
              to="/explore"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </Link>

            <button
              onClick={handleCreatePost}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <PlusCircleIcon className="w-6 h-6" />
            </button>

            <button
              onClick={goToNotifications}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
            >
              <HeartIcon className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>

            <button
              onClick={goToMessages}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
            >
              <PaperAirplaneIcon className="w-6 h-6 transform rotate-45" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>

            {/* User avatar/menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {user?.profilePicUrl ? (
                  <img
                    src={user.profilePicUrl}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-8 h-8" />
                )}
              </button>

              {/* User menu dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <button
                    onClick={goToProfile}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={goToSettings}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}