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
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://esim-backend-three.vercel.app/api",
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

        // Attach JWT if needed
        if (isAuth) {
            const token = Cookies.get("token");
            if (token) headers["Authorization"] = `Bearer ${token}`;
        }

        // Make the request
        const res = await axiosInstance({
            url,
            method,
            headers,
            params,
            // Only send body for non-GET requests
            ...(method?.toUpperCase() !== "GET" && { data }),
            ...rest,
        });

        return res.data;
    } catch (err) {
        const error = err as AxiosError<{ message?: string }>;

        // Optional: handle deleted / blocked accounts gracefully
        if (error.response?.status === 410) {
            toast.error("This account has been deleted. Please contact support.");
        } else if (error.response?.status === 403) {
            toast.error("Your account is blocked or forbidden.");
        } 
        else if (error?.response?.status === 404){
            // break;
        }
        else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong. Please try again.");
        }

        throw error; // re-throw for redux-thunk or other handlers
    }
}
