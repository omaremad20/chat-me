"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";
import useUserContext from "@/app/_customHooks/useUserContext";
import { IUserMetadata } from "@/app/_interfaces/IUserMetadata";
import { fetchCurrentUser, uploadMe } from "@/app/_lib/services/auth";

export default function Page() {
    const router = useRouter();

    const { dispatch } = useUserContext();

    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        if (window.location.hash === "") return;

        const hashArr = window.location.hash.split("&");

        const accessToken = hashArr[0]?.split("=")[1];

        setTimeout(() => {
            setAccessToken(accessToken);
        }, 0);

        window.history.replaceState(null, "", window.location.pathname);

    }, [])

    useEffect(() => {
        if (!accessToken) return;

        function errorHandling() {
            toast.error("Failed to login, tryagian later");
            router.push(JSON.parse(sessionStorage.getItem('after-redirect') || '/') || '/');
            localStorage.removeItem('user');
            sessionStorage.clear();
        }

        async function fetchUserAndInsertUserToProfilesTable() {
            try {
                const user = await fetchCurrentUser();

                const userMetadata: IUserMetadata = JSON.parse(localStorage.getItem('sb-dwqthdwtdxvujqynxnyk-auth-token')!)
                const requireuserData = {
                    name: user?.user?.identities?.at(0)?.identity_data?.name || user?.user?.user_metadata?.full_name || user?.user?.user_metadata?.name || "",
                    email: user?.user?.email || user?.user?.user_metadata?.email || user.user.identities?.at(0)?.identity_data?.email || "",
                    avatar_url: user?.user?.user_metadata?.avatar_url || user?.user?.user_metadata?.picture || user.user.identities?.at(0)?.identity_data?.avatar_url || user.user.identities?.at(0)?.identity_data?.picture || "",
                    main_id: user?.user?.id || user.user.identities?.at(0)?.id || "",
                    createdAt: user?.user?.created_at || "",
                }

                try {
                    const useruploaded = await uploadMe(requireuserData);

                    dispatch({ type: "set-user", payload: { ...requireuserData, userMetadata } });

                    localStorage.setItem("user", JSON.stringify({ ...requireuserData, userMetadata }));

                    router.push(JSON.parse(sessionStorage.getItem('after-redirect') || '/') || '/');

                    sessionStorage.removeItem('after-redirect');
                } catch {
                    errorHandling();
                    return;
                }
            } catch {
                errorHandling();
                /* make a recored page for this issue */
                return;
            }
        }

        fetchUserAndInsertUserToProfilesTable();

    }, [accessToken, dispatch, router]);

    return (
        <div className="fixed z-50 inset-0">
            <div className="m-3 h-[85vh] flex flex-col justify-center items-center text-center space-y-3">
                <LuLoaderCircle className="text-6xl animate-spin" />
                <p className="text-2xl font-bold text-center w-3/4 mx-auto">Please Wait Don&apos;t refresh or close this page we will redirect you.</p>
            </div>
        </div>
    )
}
