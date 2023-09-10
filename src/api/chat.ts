import { SWRResponse } from "swr";
import { ApiResponse, Conversation, Message, User } from "../interfaces";
import { postData, useGetData } from ".";
import { apiRoutes } from "./apiRoutes";

export const useUserListing = (): SWRResponse<ApiResponse<User[]>, Error> => {
  return useGetData<ApiResponse<User[]>>(apiRoutes.users);
};

export const useUserRead = (
  userId: string
): SWRResponse<ApiResponse<User>, Error> => {
  return useGetData<ApiResponse<User>>(apiRoutes.user(userId));
};

export const useConversationListing = (
  userId: string
): SWRResponse<ApiResponse<Conversation[]>, Error> => {
  return useGetData<ApiResponse<Conversation[]>>(
    apiRoutes.conversations(userId)
  );
};

export const useConversationRead = (
  userId: string,
  conversationId: string
): SWRResponse<ApiResponse<Conversation>, Error> => {
  return useGetData<ApiResponse<Conversation>>(
    apiRoutes.conversation(userId, conversationId)
  );
};

export const useMessageListing = (
  userId: string,
  conversationId: string
): SWRResponse<ApiResponse<User[]>, Error> => {
  return useGetData<ApiResponse<User[]>>(
    apiRoutes.messages(userId, conversationId)
  );
};

export const useGroupMessageListing = (
  userId: string,
  conversationId: string
): SWRResponse<ApiResponse<Message[]>, Error> => {
  return useGetData<ApiResponse<Message[]>>(
    apiRoutes.groupMessages(userId, conversationId)
  );
};

export const createConversation = (
  userId: string,
  body: object
): Promise<ApiResponse<void>> => {
  return postData<ApiResponse<void>>(
    apiRoutes.createConversation(userId),
    body
  );
};

export const createMessage = (
  userId: string,
  conversationId: string,
  body: object
): Promise<ApiResponse<void>> => {
  return postData<ApiResponse<void>>(
    apiRoutes.createMessage(userId, conversationId),
    body
  );
};
