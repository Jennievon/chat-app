import React, { useState } from "react";
import { User } from "../interfaces";

interface GroupConversationModalProps {
  closeModal: () => void;
  availableUsers: User[];
  handleStartConversation: (groupName: string, userIds: string[]) => void;
}

const GroupConversationModal: React.FC<GroupConversationModalProps> = ({
  closeModal,
  availableUsers,
  handleStartConversation,
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser !== id)
      );
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const createGroupConversation = () => {
    if (groupName.trim() === "" || selectedUsers.length === 0) {
      alert("Please provide a group name and select participants.");
      return;
    }

    handleStartConversation(groupName, selectedUsers);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Group Conversation</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div>
          <h3>Select Participants:</h3>
          <ul>
            {availableUsers.map((user: User) => (
              <li
                key={user?.id}
                onClick={() => toggleUserSelection(user?.id)}
                className={selectedUsers.includes(user?.id) ? "selected" : ""}
              >
                {user?.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="button-container">
          <button onClick={createGroupConversation}>Create Group</button>{" "}
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GroupConversationModal;
