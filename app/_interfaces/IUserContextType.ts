import { IUserState } from "@/app/_interfaces/IUserState";

type Action =
  | { type: "set-user"; payload: IUserState["user"] }
  | { type: "remove-user" }
  | { type: "set-loading"; payload: boolean };

export interface IUserContextType {
  state: IUserState;
  dispatch: React.Dispatch<Action>;
}
