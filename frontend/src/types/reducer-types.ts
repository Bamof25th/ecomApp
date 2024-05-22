import { User } from "./types";

export interface userReducerInitaialState {
  user: User | null;
  loading: boolean;
}
