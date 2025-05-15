
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";

export default function DashboardRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/login");
            return;
        }

        const user = getUserFromToken(token);
        if (!user || !user.role) {
            router.replace("/login");
        } else if (user.role === "ADMIN") {
            router.replace("/dashboard/admin/dashboard");
        } else if (user.role === "Manufacturer") {
            console.log(user)

            router.replace("/dashboard/manufacturer");
        } else {
            router.replace("/unauthorized");
        }
    }, []);

    return <div className="flex justify-center items-center h-screen">Redirecting...</div>;
}
