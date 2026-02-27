import { IResponseFindUserRequest } from "@/app/_interfaces/IResponseFindUserRequest";

export interface IFindUserRequest {
  status: "loading" | "error" | "success" | null;
  user: IResponseFindUserRequest | null;
}
