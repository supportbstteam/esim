"use client";

import axios, { AxiosRequestConfig, AxiosError, Method } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface ApiOptions<T = unknown, P = unknown> extends AxiosRequestConfig {
    method?: Method;        // default GET
    url: string;
    data?: T;               // request body type
    params?: P;             // query params type
    isAuth?: boolean;       // default true
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://esim-backend-three.vercel.app/api", // Replace with your API base URL
    // baseURL: "https://esim-backend-three.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export async function api<T = unknown, P = unknown>({
    url,
    method = "GET",
    data,
    params,
    isAuth = true,
    ...rest
}: ApiOptions<T, P>): Promise<T> {
    try {
        const headers: Record<string, string> = {};

        if (isAuth) {
            const token = Cookies.get("token");
            if (token) headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await axiosInstance({
            url,
            method,
            data,
            params,
            headers,
            ...rest,
        });

        // Handle success toast
        // if (["POST", "PUT", "DELETE"].includes(method.toUpperCase())) {
        //   toast.success("Action successful ✅");
        // }

        return res.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        throw error;
    }
}
