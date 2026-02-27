import { IUserUpload } from "@/app/_interfaces/IUserUpload";
import { supabase } from "@/app/_lib/supabase";

// 1. LOG-IN && SIGN-UP
export async function signInWithGoogle(afterRedirect: string = "/") {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/redirect`,
    },
  });

  if (error) {
    throw new Error("Cannot login right now , tryagian later.");
  }

  sessionStorage.setItem("after-redirect", JSON.stringify(afterRedirect));

  return data;
}

// 2. LOG-OUT
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Cannot logout right now, tryagian later.");
  }
}

// 3. GET-CURRENT-USER
export async function fetchCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("Cannot get user right now tryagian later.");
  }

  return data;
}

// 4. USER-UPLOAD-HIM-SELF-AFTER-LOGIN
export async function uploadMe(user: IUserUpload) {
  const { data: dataFindUser, error: errorFindUser } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", user.email)
    .single();

  if (errorFindUser && errorFindUser.details !== "The result contains 0 rows") {
    console.error(errorFindUser);
    throw new Error("Cannot find user right now , tryagian later.");
  }

  if (dataFindUser) return dataFindUser;

  const { data, error } = await supabase
    .from("profiles")
    .insert([user])
    .single();

  if (error) {
    throw new Error("Cannot upload user right now , tryagian later.");
  }

  return data;
}
