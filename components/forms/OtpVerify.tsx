'use client';

import { verifyOtp } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";
import { Suspense } from 'react';

const OtpVerify = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const message = searchParams.get('message');
    const [verify, setVerify] = useState<boolean>(false);

    const navigateTo = useRouter();
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [timer, setTimer] = useState(300); // 5 minutes

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
    }, [timer]);

    const formatTime = (t: number) => {
        const minutes = Math.floor(t / 60);
        const seconds = t % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleChange = (value: string, index: number) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length != 6) {
            console.log("Invalid OTP code")
            return;
        }

        setVerify(true);
        try {
            const res = await verifyOtp<any>(email!, enteredOtp);
            localStorage.setItem("token", res.data)
            navigateTo.push('/dashboard');
        } catch (err: any) {
            console.error("OTP Verification failed: ", err.message);
        } finally {
            setVerify(false);
        }
    };

    return (
        <div className=" flex items-center justify-center  px-4">
            <div className="d shadow-xl p-8 rounded-xl max-w-md w-full text-center ">
                <h2 className="text-2xl font-bold text-[#0a2826] mb-2">Verify Your Email</h2>
                <p className="text-sm text-gray-600 mb-1">OTP sent to <span className="font-medium text-black">{email}</span></p>
                <p className="text-xs text-gray-500 mb-6">Code expires in <span className="font-semibold text-[#156a64]">{formatTime(timer)}</span></p>

                {message && <div className="text-green-700 text-sm mb-4">{message}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
                    <div className="flex gap-2">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, idx)}
                                ref={(el) => { inputsRef.current[idx] = el }}
                                className="w-12 h-14 text-center text-lg font-semibold text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#156a64] transition-all"
                            />
                        ))}
                    </div>

                    <button
                        disabled={verify}
                        type="submit"
                        className={`${verify ? "opacity-40 cursor-not-allowed " : "opacity-100 hover:bg-[#156a64]"} bg-[#0a2826] hover:bg-[#156a64] text-white font-medium px-6 py-2 rounded-lg transition duration-200 w-full`}
                    >
                        {verify ? <div className='flex justify-center items-center gap-2'><Loader /> Verifying</div> : "Verify OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerify;
