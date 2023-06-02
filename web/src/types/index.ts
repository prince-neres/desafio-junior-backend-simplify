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

export interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
}

export interface TasksInfoType {
  error?: string;
  loading?: boolean;
  tasks: TaskType[];
}
