export interface UserInfoType {
  _id: string;
  token: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserType {
  error?: string;
  loading?: boolean;
  user?: UserInfoType;
}
