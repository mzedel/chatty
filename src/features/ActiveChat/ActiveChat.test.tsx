import { render, waitFor } from '@testing-library/react';
import { expect, vi, test } from 'vitest';

import { ActiveChat } from './ActiveChat';

test('renders something', async () => {
  const { getAllByText, getAllByTitle } = render(
    <ActiveChat chat={{ id: '1-2-and-3', connection: 'someone', lastInteraction: new Date().toISOString() }} userId="Mika" />
  );
  await waitFor(() => expect(getAllByText(/met you/i)).toBeTruthy(), { timeout: 2000 });
  await expect(getAllByTitle('from Someone')).toBeTruthy();
});
