import { FunctionComponent, useEffect, useState } from 'react';

import './conversation.css';
import { Conversation as ConversationType } from '../../types/common';
import { UserInfo } from '../UserInfo/UserInfo';
import { InteractionTime } from '../InteractionTime/InteractionTime';

interface Props {
  conversation: ConversationType;
  onClick: (selection: ConversationType) => void;
}

export const Conversation: FunctionComponent<Props> = ({ conversation, onClick }) => {
  const [lastInteraction, setLastInteraction] = useState<Date>(new Date(conversation.lastInteraction));

  useEffect(() => {
    setLastInteraction(new Date(conversation.lastInteraction));
  }, [conversation.lastInteraction]);

  return (
    <div className="conversation-item" onClick={() => onClick(conversation)}>
      <UserInfo user={conversation.connection} title={conversation.title} />
      <InteractionTime time={lastInteraction} />
    </div>
  );
};
