"use client";

import React, { useEffect, useReducer } from "react";
import { reducer } from "@/app/_reducers/user/userReducer";
import { UserContext } from "@/app/_contexts/user/userContext";

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { user: null, loading: true });

    useEffect(() => {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

        if (user) dispatch({ type: "set-user", payload: user });

        if (!user) localStorage.setItem('user', JSON.stringify(null));
        
        dispatch({ type: "set-loading", payload: false });
    }, [])

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}