import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import { UserInfo } from './UserInfo';

test('renders something', async () => {
  const { getByText } = render(<UserInfo title="Title test" />);
  await expect(getByText('Title test')).toBeTruthy();
});
