'use client';
import { Loader2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validation/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { post } from "@/lib/api";
import Link from "next/link";
import Loader from '../ui/Loader';

type LoginResponse = {
    token: string;
}

const LoginForm = () => {
    const [submitting, setSubmitting] = useState<boolean>(false)
    const navigateTo = useRouter()
    const [error, setError] = useState<string>("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const submitHandle = async (data: LoginFormData) => {
        setSubmitting(true);
        setError("");
        try {
            const res = await post<any>("/auth/login", data);

            // Save token to localStorage

            localStorage.setItem("token", res.data);
            console.log(res, res.data)
            navigateTo.push("/dashboard");
        } catch (err: any) {
            setError("Login failed: " + err.message);
            console.error("Login failed: ", err.message);
        } finally {
            setSubmitting(false);
        }
    }



    return (
        <div className="flex flex-col ">
            <form onSubmit={handleSubmit(submitHandle)} className="flex flex-col gap-4  md:w-[30vw]">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#156a64]"
                        {...register("email")}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#156a64]"
                        {...register("password")}
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                </div>

                {error && <p className="text-sm text-red-600 font-medium text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={submitting}
                    className={`${submitting ? "opacity-40 cursor-not-allowed " : "opacity-100 hover:bg-[#156a64]"} bg-[#0a2826] text-white px-6 py-2 rounded  transition w-full font-semibold`}
                >
                    {submitting ? <div className='flex justify-center items-center gap-2'><Loader /> Logging in</div> : "Login"}
                </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
                New user?{" "}
                <Link href="/signup" className="text-[#0a2826] hover:underline font-medium">
                    Register here
                </Link>
            </p></div>
    )
}
export default LoginForm