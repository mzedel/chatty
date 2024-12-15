import { http, HttpResponse, ws } from 'msw';
import { ChatMessage } from '../../types/common';

const baseUrl = 'chat.example.com';
const chatSocket = ws.link(`wss://${baseUrl}/chats/:chatId`);
const chatsSocket = ws.link(`wss://${baseUrl}/users/:userId/conversations`);

const authors = {
  someone: 'Someone',
  someoneElse: 'Someone else',
  self: 'initial1'
};

const conversations = {
  '1-2-and-3': {
    id: '1-2-and-3',
    connection: authors.someone,
    lastInteraction: '2020-04-14T23:11:13.850Z'
  },
  '1-2-and-4': {
    id: '1-2-and-4',
    connection: authors.someoneElse,
    lastInteraction: '2024-12-14T23:11:13.850Z'
  }
};

const chats = {
  [conversations['1-2-and-3'].id]: [
    { id: '1', content: 'hey, I just met you', createdAt: '2020-04-12T23:11:13.850Z', author: authors.someone },
    { id: '2', content: 'hey, I just met you', createdAt: '2020-04-12T23:12:13.850Z', author: authors.self },
    { id: '3', content: 'hey, I just met you', createdAt: '2020-04-12T23:13:13.850Z', author: authors.someone },
    { id: '4', content: 'hey, I just met you', createdAt: '2020-04-12T23:14:13.850Z', author: authors.self }
  ],
  [conversations['1-2-and-4'].id]: [{ id: '4', content: 'hey, I just met you', createdAt: '2020-12-14T23:11:13.850Z', author: authors.self }]
};

const getRandomDelay = () => Math.random() * (3000 - 100) + 3000;

export const handlers = [
  http.get(`https://${baseUrl}/chats/:chatId`, ({ params: { chatId } }) => {
    return HttpResponse.json(chats[chatId] || []);
  }),
  chatSocket.addEventListener('connection', ({ client, params: { chatId } }) => {
    client.addEventListener('message', event => {
      const response: ChatMessage = {
        id: new Date().toISOString(),
        content: `🔊: "${event.data as string}"`,
        createdAt: new Date().toISOString(),
        author: conversations[chatId]?.connection || 'External'
      };
      setTimeout(() => client.send(JSON.stringify(response)), getRandomDelay());
    });
  }),
  http.get(`https://${baseUrl}/users/:userId/conversations`, ({ params: { userId } }) => {
    if (userId === authors.self) {
      return HttpResponse.json(Object.values(conversations));
    }
    return HttpResponse.json([]);
  }),
  chatsSocket.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', event => {
      const newConversation = {
        id: `${event.data}-new`,
        connection: event.data,
        lastInteraction: new Date().toISOString()
      };
      setTimeout(() => client.send(JSON.stringify([newConversation, ...Object.values(conversations)])), 100);
    });
  })
];
