import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const enableMockServiceWorker = async () => {
  if (import.meta.env.NODE_ENV === 'production') {
    return;
  }
  if (import.meta.env.ENABLE_MSW === 'true') {
    const worker = setupWorker(...handlers);
    return worker.start();
  }
};
