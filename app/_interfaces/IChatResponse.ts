export interface IMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  profiles: {
    main_id: string;
    name: string | null;
    avatar_url: string | null;
    email: string | null;
  } | null;
}

export interface IPaginationChat {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IChatResponse {
  data: IMessage[];
  pagination: IPaginationChat;
}