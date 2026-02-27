import { IUserMetadata } from "@/app/_interfaces/IUserMetadata";

export interface IUserState {
  user: {
    name: string;
    email: string;
    avatar_url: string;
    main_id: string;
    createdAt: string;
    userMetadata: IUserMetadata;
  } | null;

  loading:boolean;
}
