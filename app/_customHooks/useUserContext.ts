import { useContext } from "react";
import { UserContext } from "@/app/_contexts/user/userContext";

export default function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("context is used outside provider.");
  }

  const { state, dispatch } = context;

  return { state, dispatch };
}
