'use client';

import OtpVerify from "@/components/forms/OtpVerify"
import Image from "next/image"
import logo from "@/public/logo.png"
import { Suspense, useEffect } from "react"
import { useRouter } from "next/navigation"

const VeriftyOtp = () => {

    const navigateTo = useRouter()




    return (
        <Suspense>
            <div className="min-h-screen flex items-center justify-center ">
                <div className="flex flex-col items-center justify-center w-max p-5 rounded-sm shadow-2xl">
                    <Image
                        alt="Truescan logo"
                        src={logo}
                        className="w-24 h-24 object-contain rounded-b-2xl"
                    />
                    <OtpVerify />
                </div>
            </div>
        </Suspense>
    )
}


export default VeriftyOtp