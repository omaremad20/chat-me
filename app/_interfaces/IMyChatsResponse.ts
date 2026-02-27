export interface IMyChatsResponse {
  data: Daum[]
  pagination: Pagination
}

export interface Daum {
  id: string
  created_at: string
  messages: Message[]
  conversation_members: ConversationMember[]
  other_user: OtherUser
}

export interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
  conversation_id: string
}

export interface ConversationMember {
  user_id: string
}

export interface OtherUser {
  main_id: string
  createdAt: string
  name: string
  avatar_url: string
  user_id: string
  email: string
  conversation_id: string
}

export interface Pagination {
  page: number
  pageSize: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
}
