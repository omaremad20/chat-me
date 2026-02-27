import { createContext } from "react";
import { IUserContextType } from "@/app/_interfaces/IUserContextType";

export const UserContext = createContext<IUserContextType | null>(null);
