// export interface PostType {
//   userName: string;
//   profileImage: string;
//   postDate?: string;
//   postContent: string;
//   postImage?: string;
//   likes: number;
//   comments: number;
//   shares: number;
// }
export interface PostType {
  id: string;
  author: {
    displayName: string;
    uid: string;
    userimageUrl?: string;
  };
  content: string;
  createdAt: Date;
  imageUrl: string;
  likes: string[];
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

// export interface UserType {
//   id: number;
//   name: string;
//   profileImage: string;
//   posts?: number;
//   likes?: number;
//   comments?: number;
//   followerId?: string;
//   followedId?: string;
// }
export interface UserType {
  uid: string;
  name: string;
  imageUrl?: string;
  bio?: string;
}

export interface CloseButtonProps {
  onClick: () => void;
}

export interface SignupFormData {
  email: string;
  name: string;
  password: string;
  confirmpassword: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    uid: string;
    displayName: string;
    userImageUrl: string;
  };
}

export interface CommentListProps {
  postId: string;
  limit?: number;
}

export interface PostActionsProps {
  postId?: string;
  userId?: string;
  initialLikes?: string[];
  likes?: number;
  comments: number;
  shares: number;
}
