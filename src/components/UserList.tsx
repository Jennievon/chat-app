import { useState } from "react";
import {
  createConversation,
  useConversationListing,
  useUserListing,
} from "../api/chat";
import { useChat } from "../contexts/ChatContext";
import { Conversation, SelectedType, User } from "../interfaces";
import EmptyState from "./EmptyState";
import GroupConversationModal from "./GroupConversationModal";
import { USER_ID } from "../utils";

const UserList = () => {
  const {
    selected,
    selectedUser,
    selectedConversation,
    handleCreateConversation,
    handleCreateGroupConversation,
  } = useChat();
  const { data: users } = useUserListing();
  const { data: conversationData } = useConversationListing(USER_ID);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleStartConversation = (
    groupName: string,
    selectedUsers: string[]
  ) => {
    if (conversationData) {
      const id = (conversationData?.data?.length + 1).toString();
      const data = {
        user_ids: selectedUsers,
        name: groupName,
      };
      createConversation(id, data);
      setShowModal(false);
    }
  };

  return (
    <>
      {users ? (
        <div className="user-list">
          <div className="group-conversation">
            <button onClick={handleToggleModal}>
              Start New Group Conversation
            </button>
            {showModal && (
              <GroupConversationModal
                closeModal={handleToggleModal}
                availableUsers={users?.data}
                handleStartConversation={handleStartConversation}
              />
            )}
          </div>
          <ul>
            <>
              {conversationData?.data?.map((conversation: Conversation) => (
                <li
                  key={conversation.id}
                  className={
                    conversation?.id === selectedConversation?.id &&
                    selected === SelectedType.GROUP
                      ? "active"
                      : ""
                  }
                  onClick={() => handleCreateGroupConversation(conversation)}
                >
                  <div className="group-avatar">
                    {conversation.name.charAt(0)}
                  </div>
                  <div className="info">
                    <span className="user-name">{conversation.name}</span>
                    <p className="last-message">
                      {conversation?.last_message?.text?.substring(0, 20) ||
                        "No messages yet"}
                    </p>
                  </div>
                </li>
              ))}
              {users?.data?.map((user: User) => (
                <li
                  key={user.id}
                  className={
                    user?.id === selectedUser?.id &&
                    selected === SelectedType.SINGLE
                      ? "active"
                      : ""
                  }
                  onClick={() => handleCreateConversation(user)}
                >
                  <div className="user-avatar">{user.name.charAt(0)}</div>
                  <div className="info">
                    <span className="user-name">{user.name}</span>
                  </div>
                </li>
              ))}
            </>
          </ul>
        </div>
      ) : (
        <EmptyState description={"No users found"} />
      )}
    </>
  );
};

export default UserList;
