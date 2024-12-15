import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Chat } from './Chat';

describe('Chat', () => {
  it('should render chat component', async () => {
    const { baseElement } = render(<Chat />);
    await waitFor(() => baseElement);
    expect(baseElement).toBeTruthy();
  });
});
