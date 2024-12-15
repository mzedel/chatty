import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import { InteractionTime } from './InteractionTime';

test('renders something', async () => {
  const { queryByText } = render(<InteractionTime time={new Date()} />);
  await expect(queryByText('Z')).toBeFalsy(); // no plain timestamp printe
});
