interface ChatContextValue {
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
  selected: SelectedType | null;
  selectedUser: User | null;
  selectedConversation: Conversation | null;
  handleCreateConversation: (user: User) => void;
  handleCreateGroupConversation: (group: Conversation) => void;
  logout: () => void;
}

export enum SelectedType {
  SINGLE = "single",
  GROUP = "group",
}

interface GroupConversation {
  name: string;
  members: string[];
}

interface LoginFormData {
  username: string;
  password: string;
}

interface LoggedInUser {
  id: string;
  username: string;
}

interface Message {
  id: string;
  user_id: string;
  text: string;
  sent_at: string;
}

interface Message {
  id: string;
  user_id: string;
  text: string;
  sent_at: string;
}

interface ApiResponse<T> {
  data: T;
}

interface User {
  id: string;
  name: string;
  last_seen_at: string;
}

interface Conversation {
  id: string;
  name: string;
  members: User[];
  last_message: {
    id: number;
    user_id: number;
    text: string;
    sent_at: string;
  };
}

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface HttpOptions {
  method?: HttpMethod;
  url: string;
  data?: Record<string, any>;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  timeout?: number;
}

export type {
  ChatContextValue,
  LoginFormData,
  User,
  Conversation,
  ApiResponse,
  Message,
  LoggedInUser,
  HttpOptions,
  GroupConversation,
};
