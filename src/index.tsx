import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { Chat } from './features/Chat/Chat';
import { enableMockServiceWorker } from './test/mocks/browser';

enableMockServiceWorker().then(() =>
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Chat />
    </StrictMode>
  )
);
