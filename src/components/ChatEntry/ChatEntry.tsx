import { FunctionComponent } from 'react';

import './chatEntry.css';
import { ChatMessage } from '../../types/common';
import { InteractionTime } from '../InteractionTime/InteractionTime';

interface Props {
  entry: ChatMessage;
  userId: string;
}

export const ChatEntry: FunctionComponent<Props> = ({ entry, userId }) => {
  const { content, author, createdAt } = entry;
  const isOutbound = author === userId;

  return (
    <div className={`chat-entry ${isOutbound ? 'out' : 'in'}`} title={`${isOutbound ? 'to' : 'from'} ${author}`}>
      <p>{content}</p>
      <InteractionTime time={createdAt} />
    </div>
  );
};
