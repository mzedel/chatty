import { FunctionComponent, useEffect, useRef, useState } from 'react';

import './activeChat.css';
import { ChatEntry } from '../../components/ChatEntry/ChatEntry';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { ChatMessage, Conversation } from '../../types/common';

interface Props {
  chat: Conversation;
  userId: string;
}

export const ActiveChat: FunctionComponent<Props> = ({ chat, userId }) => {
  const wsRef = useRef<WebSocket>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const { id, connection, title } = chat;

  useEffect(() => {
    setMessages([]);
    const initConversation = async () => {
      const chats = await fetch(`https://chat.example.com/chats/${id}`);
      const history = await chats.json();
      setMessages(history);
      wsRef.current = new WebSocket(`wss://chat.example.com/chats/${id}`);
      wsRef.current.addEventListener('message', event => {
        console.log(event.data);
        const receivedMessage = JSON.parse(event.data);
        console.log(receivedMessage);
        setMessages(current => [...current, receivedMessage]);
      });
    };
    initConversation();
  }, [id]);

  useEffect(() => {
    if (!messagesRef.current) {
      return;
    }
    messagesRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  const onSubmit = (formData: FormData) => {
    const message = formData.get('content') as string;
    if (!message) {
      return;
    }
    wsRef.current?.send(message);
    setMessages(current => [
      ...current,
      {
        id: current[current.length - 1]?.id ?? 'new',
        content: message,
        createdAt: new Date().toISOString(),
        author: userId
      }
    ]);
  };

  return (
    <div className="chat">
      <UserInfo title={title} user={connection} />
      <div className="entries">
        {messages.map(message => (
          <ChatEntry entry={message} key={message.id} userId={userId} />
        ))}
        <div ref={messagesRef} />
      </div>
      <form action={onSubmit} className="message-input">
        <input name="content" />
        <button className="regular-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
