import { useState } from 'react';

import { Conversation } from '../../types/common';
import { ActiveChat } from '../ActiveChat/ActiveChat';
import { Conversations } from '../Conversations/Conversations';
import './chat.css';

export const Chat = () => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>();
  const [userId] = useState<string>('initial1');

  return (
    <div className="page chat-app">
      <Conversations userId={userId} onSelect={setCurrentConversation} />
      {currentConversation ? (
        <ActiveChat chat={currentConversation} userId={userId} />
      ) : (
        <div className="empty-state">Select a chat to continue the conversation</div>
      )}
    </div>
  );
};
