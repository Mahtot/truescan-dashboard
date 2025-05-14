'use client'
import logo from "@/public/logo.png"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, LogOut, SquareChevronRight } from "lucide-react"
import Modal from "../Modal"

const NavBar = () => {
    const items = [
        { name: "Dashboard", to: "dashboard" },
        { name: "Register Product", to: "register-product" },
        { name: "View products", to: "view-products" },
        { name: "Settings", to: "settings" }
    ]

    const [modal, setModal] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleClick = () => {
        localStorage.removeItem("token")
    }

    const handleCancel = () => {
        setModal(false)
    }

    return (
        <div className="bg-[#051313] flex lg:flex-col justify-between items-center lg:items-start gap-5 p-5 z-50 h-[80px] lg:h-screen lg:w-[18vw] text-white w-full fixed top-0 left-0 bottom-0 overflow-y-auto">
            {/* Logo */}
            <Image src={logo} alt="Logo" className=" w-[120px] z-50" />

            {isMenuOpen ? <X onClick={() => setIsMenuOpen(false)} className="z-50 flex lg:hidden" /> : <Menu onClick={() => setIsMenuOpen(true)} className="flex lg:hidden" />}
            <div className={`${isMenuOpen ? "flex fixed lg:relative  right-0 lg:left-0  top-0 bottom-0 bg-inherit z-40 py-20 px-10 lg:p-0 h-screen overflow-y-auto" : "hidden lg:flex "} transition-all duration-300 lg:flex flex-col gap-3 mt-5 font-sans `}>
                {items.map((item, index) => (
                    <Link href={`/dashboard/manufacturer/${item.to}`} key={index} className="hover:opacity-75 transition-all duration-300">
                        {item.name}
                    </Link>
                ))}
                <button
                    className=" lg:hidden mt-auto w-full text-left hover:opacity-75 transition-all duration-300 flex items-center justify-start gap-2"
                    onClick={() => setModal(true)}
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* Logout Button */}
            <button
                className="hidden lg:flex mt-auto w-full text-left hover:opacity-75 transition-all duration-300  items-center justify-start gap-2"
                onClick={() => setModal(true)}
            >
                <LogOut size={18} /> Logout
            </button>

            {/* Modal */}
            {modal && <Modal message="Are you sure you want to logout?" handleClick={handleClick} handleCancel={handleCancel} />}

        </div>
    )
}

export default NavBar
