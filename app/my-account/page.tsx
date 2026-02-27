"use client";

import Login from "@/app/_components/ui/login";
import useUserContext from "@/app/_customHooks/useUserContext";
import UserDataList from '@/app/_features/my-account/userDataList';
import UserImage from "@/app/_features/my-account/userImage";
import { IUserInput } from '@/app/_interfaces/IUserInput';
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../_lib/services/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Page() {
    const { state, dispatch } = useUserContext();
    const router = useRouter();
    const [logoutStatus, setLogoutStatus] = useState<'success' | 'error' | 'loading' | null>(null);

    async function Logout() {
        setLogoutStatus('loading');

        try {
            dispatch({ type: 'set-loading', payload: true });

            dispatch({ type: 'remove-user' });

            await logout();

            localStorage.setItem('user', JSON.stringify(null));

            dispatch({ type: 'set-loading', payload: false });

            setLogoutStatus('success');

            toast.success('Logout Successfully');

            router.push('/');

        } catch {
            toast.success('Failed to logout tryagian later');
            setLogoutStatus('error');
            return;
        }
    }

    if (!state?.user) return (
        <Login>
            <h1 className='text-xl font-medium text-center'>Login now to get access to see your profile.</h1>
        </Login>
    )

    const userInputs: IUserInput[] = [
        {
            header: "ID",
            data: state.user.main_id,
        },
        {
            header: "NAME",
            data: state.user.name,
        },
        {
            header: "EMAIL",
            data: state.user.email,
        },
        {
            header: "JOINED",
            data: state.user.createdAt,
        },
    ]

    return (
        <div className="m-3 flex flex-col space-y-5 justify-between h-[85vh]">
            <div className="space-y-5">
                <h2 className="text-center font-semibold text-2xl">MY ACCOUNT</h2>

                <UserImage user={state} />

                <UserDataList userInputs={userInputs} />

                <button
                    disabled={logoutStatus === 'loading'}
                    onClick={Logout}
                    className="my-btn w-full flex items-center justify-center space-x-3 p-2! pb-2.5!"
                    aria-label="Log out"
                    title="Log out"
                >

                    <span>
                        Log out
                    </span>
                    {
                        logoutStatus === 'loading' ? <span>
                            <AiOutlineLoading className="animate-spin" />
                        </span>
                            : <span>
                                <IoIosLogOut />
                            </span>
                    }
                </button>
            </div>
        </div>
    )
}
