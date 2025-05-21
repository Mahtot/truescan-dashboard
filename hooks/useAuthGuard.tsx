'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromToken } from "@/lib/auth"

const useAuthGuard = (allowedRole: string) => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const now = Math.floor(Date.now() / 1000);

            if (!token) {
                router.push('/login');
                return;
            }

            const user = getUserFromToken(token);

            if (!user || user.exp < now) {
                localStorage.removeItem('token');
                router.push('/login');
            } else if (user.role !== allowedRole) {
                router.push('/unauthorized');
            }
        };

        // Checks immediately on mount
        checkAuth();

        // Then check every 30 seconds - bc a user with an expired token should automatially  be redirected 
        const interval = setInterval(checkAuth, 30_000);

        return () => clearInterval(interval);
    }, [router]);
};

export default useAuthGuard;
