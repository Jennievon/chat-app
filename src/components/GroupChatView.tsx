import React, { useState, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import {
  useGroupMessageListing,
  createMessage,
  useConversationRead,
} from "../api/chat";
import { Message, User } from "../interfaces";
import { formatTimestamp } from "../utils";
import { mutate } from "swr";
import { apiRoutes } from "../api/apiRoutes";
import { USER_ID } from "../utils/constants";

const GroupChatView = () => {
  const { selectedConversation } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message | null>(null);

  const { data: conversation } = useConversationRead(
    USER_ID,
    selectedConversation?.id || ""
  );
  const { data: messageData } = useGroupMessageListing(
    USER_ID,
    conversation?.data?.id || ""
  );

  useEffect(() => {
    if (messageData) {
      setMessages(messageData.data);
    }
  }, [messageData]);

  const handleMessageSend = (e: any) => {
    e.preventDefault();
    const message = e.target.message.value;

    if (message.trim() !== "" && conversation) {
      setNewMessage({
        id: (messages.length + 1).toString(),
        user_id: USER_ID,
        text: message,
        sent_at: new Date().toISOString(),
      });
      createMessage(USER_ID, conversation.data.id, { text: message })
        .then(() => {
          mutate(apiRoutes.conversation(USER_ID, conversation.data.id));
          mutate(apiRoutes.conversations(USER_ID));
          setNewMessage(null);
        })
        .catch((error: any) => {
          console.error("Error sending message:", error);
        });

      e.target.message.value = "";
    }
  };

  return (
    <div className="chat-view">
      <div className="chat-header">
        <div className="user-info">
          <div className="group-avatar">
            {conversation?.data?.name?.charAt(0)}
          </div>
          <div className="user-details">
            <h2 className="user-name">{conversation?.data?.name}</h2>
            <p className="last-seen">
              Members:{" "}
              {conversation?.data?.members
                ?.map((member: User) => member.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {conversation?.data?.last_message && (
          <div className="message right">
            <div className="message-content">
              <p className="message-text">
                {conversation?.data?.last_message?.text}
              </p>
              <p className="message-timestamp">
                {formatTimestamp(conversation?.data?.last_message.sent_at)}
              </p>
            </div>
          </div>
        )}
        {newMessage && (
          <div className="message right">
            <div className="message-content">
              <p className="message-text">{newMessage?.text}</p>
              <p className="message-timestamp">
                {formatTimestamp(newMessage?.sent_at)}
              </p>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleMessageSend} className="chat-input">
        <input type="text" name="message" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default GroupChatView;
