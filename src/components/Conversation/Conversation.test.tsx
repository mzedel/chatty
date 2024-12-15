import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Conversation } from './Conversation';
import { Conversation as ConversationType } from '../../types/common';

test('renders something', async () => {
  const conversation: ConversationType = {
    id: 'test',
    lastInteraction: new Date().toISOString(),
    connection: 'Someone'
  };
  const user = userEvent.setup();

  const onClickMock = vi.fn();
  const { getByText, queryByText } = render(<Conversation conversation={conversation} onClick={onClickMock} />);
  const item = getByText('Someone');
  await expect(item).toBeTruthy();
  await expect(queryByText('Z')).toBeFalsy(); // no plain timestamp printed
  await user.click(item);
  await expect(onClickMock).toHaveBeenCalled();
});
