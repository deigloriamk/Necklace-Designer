import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PlayIcon,
  HeartIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { useAuthStore } from '@/store/authStore'
import { useCreatePostModalStore } from '@/store/createPostModalStore'

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const { openCreatePostModal } = useCreatePostModalStore()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Search', href: '/explore', icon: MagnifyingGlassIcon },
    { name: 'Explore', href: '/explore', icon: PlayIcon },
    { name: 'Messages', href: '/messages', icon: PaperAirplaneIcon },
    { name: 'Notifications', href: '/notifications', icon: HeartIcon },
    { name: 'Create', href: '#', icon: PlusCircleIcon, action: openCreatePostModal },
    { name: 'Profile', href: `/profile/${user?.username}`, icon: UserCircleIcon },
  ]

  const secondaryNavigation = [
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Saved', href: '/saved', icon: BookmarkIcon },
  ]

  const isActive = (href: string) => {
    if (href === '#') return false
    return location.pathname === href
  }

  const handleLogout = async () => {
    await logout()
    onClose?.()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-4">
        <div className="px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <button
                key={item.name}
                onClick={() => {
                  if (item.action) {
                    item.action()
                    onClose?.()
                  } else {
                    // Navigate will be handled by Link
                  }
                }}
                className={`
                  w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${active
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            )
          })}
        </div>

        <div className="mt-6 px-3">
          <div className="border-t border-gray-200 pt-6 space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    ${active
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* User section */}
      {user && (
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user.profilePicUrl ? (
                <img
                  src={user.profilePicUrl}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{user.username}</p>
              <p className="text-xs text-gray-500">{user.fullName || 'No name'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}