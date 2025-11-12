import React from 'react'
import { useParams } from 'react-router-dom'

export function Profile() {
  const { username } = useParams()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        {username ? `${username}'s Profile` : 'Profile'}
      </h1>
      <div className="text-center py-12">
        <div className="text-gray-500">
          <p className="text-lg mb-2">Profile page coming soon!</p>
          <p>This will show user posts, followers, following, etc.</p>
        </div>
      </div>
    </div>
  )
}