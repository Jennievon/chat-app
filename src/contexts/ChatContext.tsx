import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ChatContextValue,
  Conversation,
  LoggedInUser,
  SelectedType,
  User,
} from "../interfaces";
import { removeFromLocalStorage } from "../utils";

interface ChatContextProps {
  children: ReactNode;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const useChat = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<ChatContextProps> = ({ children }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selected, setSelected] = useState<SelectedType | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleCreateConversation = (u: User) => {
    setSelectedUser(u);
    setSelected(SelectedType.SINGLE);
  };

  const handleCreateGroupConversation = (group: Conversation) => {
    setSelectedConversation(group);
    setSelected(SelectedType.GROUP);
  };

  const logout = () => {
    removeFromLocalStorage("user");
    setUser(null);
  };

  const value: ChatContextValue = {
    user,
    setUser,
    selected,
    selectedUser,
    selectedConversation,
    handleCreateConversation,
    handleCreateGroupConversation,
    logout,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
