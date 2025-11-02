'use client'

import { baseUrl } from "@/constants";

export async function apiCall<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: unknown
): Promise<T> {
    const res = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "API request failed");
    }

    return res.json();
}
