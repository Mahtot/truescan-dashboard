'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/validation/validation";
import Image from "next/image";
import logo from "@/public/logo.png";
import { post } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";
import Loader from "../ui/Loader";

type RegisterResponse = {
    message: string;
}

const SignupForm = () => {
    const navigateTo = useRouter()
    const [error, setError] = useState<string>("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });
    const [submitting, setSubmitting] = useState<boolean>(false)

    const submitHandle = async (data: SignupFormData) => {
        const payload = {
            email: data.email,
            password: data.password,
            companyName: data.companyName,
            role: "Manufacturer"
        };

        setSubmitting(true);

        try {
            const res = await post<RegisterResponse>("/auth/register", payload);
            sessionStorage.setItem('otpAllowed', 'true');
            navigateTo.push(`/verify-otp?email=${encodeURIComponent(data.email)}&message=${encodeURIComponent(res.message)}`);
        } catch (err: any) {
            setError(err.message)
            console.error("Registration failed: ", err.message);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="flex flex-col ">
            <form onSubmit={handleSubmit(submitHandle)} className="flex flex-col gap-4  md:w-[30vw]">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        {...register("email")}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        {...register("password")}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Company Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        {...register("companyName")}
                    />
                    {errors.companyName && (
                        <p className="text-sm text-red-500">{errors.companyName.message}</p>
                    )}
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={submitting}
                    className={`${submitting ? "opacity-40 cursor-not-allowed " : "opacity-100 hover:bg-[#156a64]"} bg-[#0a2826] text-white px-6 py-2 rounded  transition w-full font-semibold`}
                >
                    {submitting ? <div className='flex justify-center items-center gap-2'><Loader /> Registering</div> : "Register"}
                </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
                Already have account?{" "}
                <Link href="/login" className="text-[#0a2826] hover:underline font-medium">
                    Login                </Link>
            </p>
        </div>

    );
};

export default SignupForm;
