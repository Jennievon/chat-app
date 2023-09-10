import React from "react";
import { useChat } from "./contexts/ChatContext";
import ConversationView from "./components/ConversationView";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EmptyState from "./components/EmptyState";
import GroupChatView from "./components/GroupChatView";

function App() {
  const { user, selected } = useChat();

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Chat App</h1>
      </header>
      <main>
        <div className="App-container">
          {!user ? (
            <Login />
          ) : (
            <>
              <div className="App-sidebar">
                <UserList />
              </div>
              <div className="App-main">
                {selected === "single" ? (
                  <ConversationView />
                ) : selected === "group" ? (
                  <GroupChatView />
                ) : (
                  <EmptyState
                    description={"Select a user or group to start chatting"}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
