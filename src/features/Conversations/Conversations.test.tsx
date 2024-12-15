import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, test } from 'vitest';

import { Conversations } from './Conversations';

test('renders something', async () => {
  const onSelectMock = vi.fn();
  const { getAllByText, getByText } = render(<Conversations userId="initial1" onSelect={onSelectMock} />);
  await waitFor(() => expect(getAllByText(/someone/i)).toBeTruthy(), { timeout: 2000 });
  await expect(getByText('Someone else')).toBeTruthy();
  await userEvent.click(getByText('Someone else'));
  await expect(onSelectMock).toHaveBeenCalled();
});
