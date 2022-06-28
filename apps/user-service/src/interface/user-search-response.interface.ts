import { User } from './user.interface';

export interface IUserSearchResponse {
  status: number;
  message: string;
  user: User | null;
}
