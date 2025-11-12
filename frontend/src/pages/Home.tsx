import React from 'react'

export function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Home Feed</h1>
      <div className="text-center py-12">
        <div className="text-gray-500">
          <p className="text-lg mb-2">Welcome to ChatterZbox!</p>
          <p>Your feed will appear here once you follow other users.</p>
        </div>
      </div>
    </div>
  )
}