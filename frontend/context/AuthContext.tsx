"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User } from "@/types/type";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    refreshUser: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    loading: true,
    refreshUser: async () => { },
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const isAuthenticated = !!user;


    const refreshUser = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
                { withCredentials: true }
            );
            const userId = data.user?.id;
            if (!userId) return setUser(null);

            const { data: userRes } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/userbyid/${userId}`,
                { withCredentials: true }
            );
            setUser(userRes.data);
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                // tidak perlu log panjang‑panjang—ini normal saat belum login
                setUser(null);
            } else {
                console.error("Gagal ambil user:", err);
            }
        } finally {
            setLoading(false);
        }
    };


    const login = async (email: string, password: string) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
                { email, password },
                { withCredentials: true }
            );
            await refreshUser();
            toast.success("Login successful!");
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Login failed. Please try again.";
            toast.error(message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`,
                {},
                { withCredentials: true }
            );
            setUser(null);
            toast.success("Logout successfully");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        } finally {
            router.push('/');
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, loading, refreshUser, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
