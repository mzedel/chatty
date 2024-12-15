import { FunctionComponent, useEffect, useRef, useState } from 'react';

import './conversations.css';
import { Conversation } from '../../components/Conversation/Conversation';
import { Conversation as ConversationType } from '../../types/common';

interface Props {
  userId: string;
  onSelect: (selection: ConversationType) => void;
}

export const Conversations: FunctionComponent<Props> = ({ userId, onSelect }) => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const wsRef = useRef<WebSocket>(null);

  useEffect(() => {
    const initChats = async () => {
      const chats = await fetch(`https://chat.example.com/users/${userId}/conversations`);
      const conversations = await chats.json();
      setConversations(conversations);
      wsRef.current = new WebSocket(`wss://chat.example.com/users/${userId}/conversations`);
      wsRef.current.addEventListener('message', event => {
        const conversations = JSON.parse(event.data);
        setConversations(conversations);
      });
    };
    initChats();
  }, [userId]);

  const onSubmit = (formData: FormData) => {
    const message = formData.get('user') || '';
    wsRef.current?.send(message);
  };

  return (
    <div className="conversation-wrapper">
      <h3>Chats</h3>
      <div className="conversations">
        {conversations.map(item => (
          <Conversation key={item.id} conversation={item} onClick={onSelect} />
        ))}
      </div>
      <form action={onSubmit} className="conversation-starter">
        <input name="user" />
        <button className="regular-button" type="submit">
          +
        </button>
      </form>
    </div>
  );
};
