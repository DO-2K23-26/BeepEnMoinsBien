import React from 'react';

function ChatBox() {
    return (
      <div className="chat-container flex flex-col h-screen w-full border border-black">
        <div className="chat-header p-2 ">
          <h2>Channel Name</h2>
        </div>
        <div className="chat-messages flex-grow overflow-y-auto p-2">
          <div className="message mb-2">
            <strong>User1:</strong> Hello!
          </div>
          <div className="message mb-2">
            <strong>User2:</strong> Hi, User1!
          </div>
          {/* Add more messages here */}
        </div>
        <div className="chat-input flex items-center p-2 border-t border-black">
          <input type="text" className="flex-grow box-border mr-2" placeholder="Type a message..." />
          <button className="mr-2">
            Send
          </button>
          <button>
            Add
          </button>
        </div>
      </div>
    );
}

export default ChatBox;