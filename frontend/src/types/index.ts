// User types
export interface User {
  id: string
  username: string
  email: string
  fullName?: string
  bio?: string
  profilePicUrl?: string
  isPrivate: boolean
  isVerified: boolean
  emailVerified: boolean
  followersCount: number
  followingCount: number
  postsCount: number
  lastActive: string
  createdAt: string
  updatedAt: string
}

export interface PublicUser {
  id: string
  username: string
  fullName?: string
  bio?: string
  profilePicUrl?: string
  isPrivate: boolean
  isVerified: boolean
  followersCount: number
  followingCount: number
  postsCount: number
  isFollowing: boolean
  createdAt: string
}

// Post types
export interface Post {
  id: string
  userId: string
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO'
  caption?: string
  location?: string
  likeCount: number
  commentCount: number
  isLiked: boolean
  isSaved: boolean
  createdAt: string
  updatedAt: string
  user: {
    id: string
    username: string
    profilePicUrl?: string
    isVerified: boolean
  }
}

export interface CreatePostData {
  media: File
  caption?: string
  location?: string
  hashtags?: string[]
}

// Comment types
export interface Comment {
  id: string
  postId: string
  userId: string
  parentCommentId?: string
  content: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  user: {
    id: string
    username: string
    profilePicUrl?: string
  }
  replies?: Comment[]
}

// Follow types
export interface Follow {
  id: string
  followerId: string
  followingId: string
  createdAt: string
}

// Message types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  messageType: 'TEXT' | 'IMAGE' | 'VIDEO'
  mediaUrl?: string
  isDeleted: boolean
  readAt?: string
  createdAt: string
}

export interface Conversation {
  id: string
  otherUser: {
    id: string
    username: string
    profilePicUrl?: string
  }
  lastMessage: {
    content: string
    createdAt: string
    senderId: string
  }
  unreadCount: number
  updatedAt: string
}

// Notification types
export interface Notification {
  id: string
  userId: string
  fromUserId?: string
  type: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'MENTION' | 'MESSAGE' | 'STORY_VIEW'
  referenceId?: string
  message: string
  isRead: boolean
  createdAt: string
  fromUser?: {
    id: string
    username: string
    profilePicUrl?: string
  }
}

// Story types
export interface Story {
  id: string
  userId: string
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO'
  expiresAt: string
  isActive: boolean
  createdAt: string
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  fullName?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
}

// API response types
export interface ApiResponse<T = any> {
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  nextCursor?: string
  hasMore: boolean
}

// Form types
export interface FormErrors {
  [key: string]: string[] | undefined
}

// UI state types
export interface ModalState {
  isOpen: boolean
  data?: any
}

// Search types
export interface SearchResult {
  users: PublicUser[]
  hashtags: { name: string; postCount: number }[]
  posts: Post[]
}

// Feed types
export interface FeedPost extends Post {
  user: PublicUser
  comments?: Comment[]
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>