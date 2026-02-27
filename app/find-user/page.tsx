"use client";

import { IFindUserRequest } from "@/app/_interfaces/IFindUserRequest";
import { searchUserByEmail } from "@/app/_lib/services/findUser";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import FindUserFormContainer from "@/app/_features/find-user/findUserFormContainer";
import FindUserFormErrorStatusContainer from "@/app/_features/find-user/findUserFormErrorStatusContainer";
import FindUserFormLoadingStatusContainer from "@/app/_features/find-user/findUserFormLoadingStatusContainer";
import FindUserNullStatusContainer from "@/app/_features/find-user/findUserNullStatusContainer";
import FindUserSuccessStatusContainer from "@/app/_features/find-user/findUserSuccessStatusContainer";
import useUserContext from "../_customHooks/useUserContext";
import Login from "../_components/ui/login";

export default function Page() {
    const { state } = useUserContext()

    const [email, setEmail] = useState("");

    const [request, setRequest] = useState<IFindUserRequest>({
        status: null,
        user: null
    })

    if (!state) return (
        <Login>
            <h1 className='text-xl font-medium text-center'>Login now to get access to see your profile.</h1>
        </Login>
    )

    async function handleSubmit(e?: FormEvent) {
        setRequest({
            status: "loading",
            user: null
        })

        e?.preventDefault();

        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/;

        if (!email || email.trim() === "" || !emailRegex.test(email)) {
            setRequest({
                status: null,
                user: null
            })

            toast.error("Please put a valid email pattern!", { id: "invalidEmail" });

            return;
        }

        try {
            const user = await searchUserByEmail(email, state.user!.main_id);

            setRequest({
                status: "success",
                user: {
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    avatar_url: user.avatar_url,
                    user_id: user.user_id,
                    main_id: user.main_id,
                }
            });

            toast.success("user found");
        } catch {
            setRequest({
                status: "error",
                user: null
            });

            toast.error("Cannot find user.");
        }
    }

    function handleFocus() {
        window.addEventListener("keydown", (e) => {
            if (e.code === "Enter") handleSubmit();
        })
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[86vh] m-3 mb-0">
            <FindUserFormContainer handleFocus={handleFocus} email={email} setEmail={setEmail} handleSubmit={handleSubmit} />

            <div className="border rounded-md py-2.5 px-5 space-y-3 border-gray-100 border-r-0 shadow bg-white">
                {
                    request.status === "success" && request.user &&
                    <FindUserSuccessStatusContainer request={request} />
                }

                {
                    request.status === "loading" &&
                    <FindUserFormLoadingStatusContainer />
                }

                {
                    request.status === "error" &&
                    <FindUserFormErrorStatusContainer />
                }

                {
                    request.status === null &&
                    <FindUserNullStatusContainer />
                }
            </div>
        </div>
    )
}
