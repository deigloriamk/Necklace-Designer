import React from 'react'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'

interface CreatePostModalProps {
  onClose: () => void
}

export function CreatePostModal({ onClose }: CreatePostModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Create new post</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center py-12">
            <div className="text-gray-500">
              <PhotoIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">Drag photos and videos here</p>
              <button className="instagram-button-outline">
                Select from computer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}