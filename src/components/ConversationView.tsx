import React from "react";
import { useChat } from "../contexts/ChatContext";
import { useUserRead, createMessage } from "../api/chat";
import { Message } from "../interfaces";
import { formatLastSeen, formatTimestamp } from "../utils";

const ConversationSingleView = () => {
  const { selectedUser } = useChat();
  const [messages, setMessages] = React.useState<Message[]>([]);

  const { data: user } = useUserRead(selectedUser?.id || "");

  const useHandleMessageSend = (e: any) => {
    e.preventDefault();
    const message = e.target.message.value;

    if (message.trim() !== "" && user) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        user_id: user?.data?.id,
        text: message,
        sent_at: new Date().toISOString(),
      };

      setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);

      createMessage(user?.data?.id, user.data.id, { text: message })
        .then(() => {})
        .catch((error: any) => {
          console.error("Error sending message:", error);
        });
      e.target.message.value = "";
    }
  };

  return (
    <div className="chat-view">
      <div className="chat-header">
        {user && (
          <div className="user-info">
            <div className="user-avatar">{user?.data?.name?.charAt(0)}</div>
            <div className="user-details">
              <h2 className="user-name">{user?.data?.name}</h2>
              <p className="last-seen">
                Last seen: {formatLastSeen(user?.data?.last_seen_at)}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="chat-messages">
        {messages?.map((message: Message) => {
          return (
            <div
              key={message.id}
              className={`message ${
                message.user_id === selectedUser?.id ? "right" : "left"
              }`}
            >
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                <p className="message-timestamp">
                  {formatTimestamp(message.sent_at)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={useHandleMessageSend} className="chat-input">
        <input type="text" name="message" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ConversationSingleView;
