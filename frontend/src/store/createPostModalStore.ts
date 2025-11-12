import { create } from 'zustand'

interface CreatePostModalState {
  isCreatePostModalOpen: boolean
  selectedFiles: File[]
  caption: string
  location: string
  hashtags: string[]
  isUploading: boolean
  uploadProgress: number
}

interface CreatePostModalActions {
  openCreatePostModal: () => void
  closeCreatePostModal: () => void
  setSelectedFiles: (files: File[]) => void
  setCaption: (caption: string) => void
  setLocation: (location: string) => void
  setHashtags: (hashtags: string[]) => void
  setIsUploading: (isUploading: boolean) => void
  setUploadProgress: (progress: number) => void
  resetForm: () => void
}

export const useCreatePostModalStore = create<CreatePostModalState & CreatePostModalActions>(
  (set) => ({
    // Initial state
    isCreatePostModalOpen: false,
    selectedFiles: [],
    caption: '',
    location: '',
    hashtags: [],
    isUploading: false,
    uploadProgress: 0,

    // Actions
    openCreatePostModal: () => set({ isCreatePostModalOpen: true }),
    closeCreatePostModal: () => {
      set({ isCreatePostModalOpen: false })
      // Don't reset form immediately to allow users to continue where they left off
    },

    setSelectedFiles: (files) => set({ selectedFiles: files }),
    setCaption: (caption) => set({ caption }),
    setLocation: (location) => set({ location }),
    setHashtags: (hashtags) => set({ hashtags }),
    setIsUploading: (isUploading) => set({ isUploading }),
    setUploadProgress: (progress) => set({ uploadProgress: progress }),

    resetForm: () => set({
      selectedFiles: [],
      caption: '',
      location: '',
      hashtags: [],
      isUploading: false,
      uploadProgress: 0,
    }),
  })
)