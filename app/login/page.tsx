import Image from "next/image"
import logo from "@/public/logo.png"
import LoginForm from "@/components/forms/LoginForm"

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-2">
            <div className="flex flex-col items-center justify-center w-max p-10 px-16 rounded-sm shadow-2xl ">
                <Image
                    alt="Truescan logo"
                    src={logo}
                    className="w-24 h-24 object-contain rounded-b-2xl"
                />
                <h1 className="font-bold text-[#0c2f2d] mb-4">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}
export default LoginPage