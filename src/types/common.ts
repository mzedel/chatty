export type Conversation = {
  id: string;
  title?: string;
  connection: string;
  lastInteraction: string;
};

export type ChatMessage = {
  id: string;
  content: string;
  createdAt: string;
  author: string;
};
