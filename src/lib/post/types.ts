export interface PostType {
  content: string;
  imageUrl?: string;
  author: {
    uid: string;
    displayName: string;
    userImageUrl?: string;
  };
}
