import React from 'react'
import { useParams } from 'react-router-dom'

export function PostDetail() {
  const { postId } = useParams()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Post Detail</h1>
      <div className="text-center py-12">
        <div className="text-gray-500">
          <p className="text-lg mb-2">Post detail page coming soon!</p>
          <p>View post with ID: {postId}</p>
        </div>
      </div>
    </div>
  )
}