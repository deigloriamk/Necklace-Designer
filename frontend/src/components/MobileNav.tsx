import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PlayIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { useCreatePostModalStore } from '@/store/createPostModalStore'

export function MobileNav() {
  const location = useLocation()
  const { openCreatePostModal } = useCreatePostModalStore()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Search', href: '/explore', icon: MagnifyingGlassIcon },
    { name: 'Create', href: '#', icon: PlusCircleIcon, action: openCreatePostModal },
    { name: 'Reels', href: '/reels', icon: PlayIcon },
    { name: 'Profile', href: `/profile/current`, icon: UserCircleIcon },
  ]

  const isActive = (href: string) => {
    if (href === '#') return false
    return location.pathname === href
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <button
              key={item.name}
              onClick={() => {
                if (item.action) {
                  item.action()
                }
                // Navigation will be handled by Link for other items
              }}
              className={`
                mobile-nav-btn flex flex-col items-center justify-center p-2 text-xs
                ${active ? 'text-primary-600' : 'text-gray-600'}
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="mt-1">{item.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}