import { FunctionComponent, useState } from 'react';

import './interactionTime.css';

interface Props {
  time: string | Date;
}

const timeFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' });

export const InteractionTime: FunctionComponent<Props> = ({ time }) => {
  const [interactionTime] = useState<Date>(new Date(time));

  return <div className="interaction-time">{timeFormatter.format(interactionTime)}</div>;
};
