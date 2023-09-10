export const apiRoutes = {
  users: "/user",
  user: (userId: string) => `/user/${userId}`,
  conversation: (userId: string, conversationId: string) =>
    `/user/${userId}/conversation/${conversationId}`,
  conversations: (userId: string) => `/user/${userId}/conversation`,
  messages: (userId: string, conversationId: string) =>
    `/user/${userId}/conversation/${conversationId}/message`,
  message: (userId: string, conversationId: string, messageId: string) =>
    `/user/${userId}/conversation/${conversationId}/message/${messageId}`,
  groupMessages: (userId: string, conversationId: string) =>
    `/user/${userId}/conversation/${conversationId}/message`,
  groupMessage: (userId: string, conversationId: string, messageId: string) =>
    `/user/${userId}/conversation/${conversationId}/message/${messageId}`,
  createConversation: (userId: string) => `/user/${userId}/conversation`,
  createMessage: (userId: string, conversationId: string) =>
    `/user/${userId}/conversation/${conversationId}/message`,
  createGroupMessage: (userId: string, conversationId: string) =>
    `/user/${userId}/conversation/${conversationId}/message`,
  createGroupConversation: (userId: string) => `/user/${userId}/conversation`,
};
