export interface PostType {
  userName: string;
  profileImage: string;
  postDate?: string;
  postContent: string;
  postImage?: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface CommentType {
  postId: number;
  userName: string;
  profileImage: string;
  commentDate: string;
  commentText: string;
  likes: number;
}

export interface UserType {
  id: number;
  name: string;
  profileImage: string;
  posts: number;
  likes: number;
  comments: number;
}
