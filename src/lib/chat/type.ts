export interface MessageType {
  id: string;
  senderId: string;
  text: string;
  createdAt: Date;
}

export type ChatRoomType = {
  chatRoomId: string;
  lastMessage: string;
  userIds: string[];
};
