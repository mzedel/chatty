import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import { ChatEntry } from './ChatEntry';

test('renders something', async () => {
  const entry = { id: 'test', content: 'heyho', author: 'someone', createdAt: new Date().toISOString() };

  const { getByText } = render(<ChatEntry entry={entry} userId="me" />);
  await expect(getByText('heyho')).toBeTruthy();
});
