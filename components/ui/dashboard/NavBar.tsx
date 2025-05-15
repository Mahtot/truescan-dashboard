'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import Modal from "../Modal";
import logo from "@/public/logo.png";

// Type for Nav Item
type NavItem = {
    name: string;
    to: string;
};

interface NavBarProps {
    items: NavItem[];
}

const NavBar = ({ items }: NavBarProps) => {
    const router = useRouter();
    const [modal, setModal] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const handleCancel = () => {
        setModal(false);
    };

    return (
        <div className="bg-[#051313] flex lg:flex-col justify-between items-center lg:items-start gap-5 p-5 z-50 h-[80px] lg:h-screen lg:w-[18vw] text-white w-full fixed top-0 left-0 bottom-0 overflow-y-auto">

            {/* Logo */}
            <Image src={logo} alt="Logo" className="w-[120px] z-50" />

            {/* Mobile Toggle */}
            {isMenuOpen ? (
                <X onClick={() => setIsMenuOpen(false)} className="z-50 flex lg:hidden cursor-pointer" />
            ) : (
                <Menu onClick={() => setIsMenuOpen(true)} className="flex lg:hidden cursor-pointer" />
            )}

            {/* Menu Items */}
            <div className={`${isMenuOpen ? "flex fixed right-0 top-0 bottom-0 bg-inherit z-40 py-20 px-10 h-screen" : "hidden"} lg:flex lg:relative lg:left-0 lg:p-0 transition-all duration-300 flex-col gap-3 mt-5 font-sans`}>
                {items!.map((item) => (
                    <Link
                        href={`/dashboard/${item.to}`}
                        key={item.to}
                        className="hover:opacity-75 transition-all duration-300"
                    >
                        {item.name}
                    </Link>
                ))}

                {/* Logout Button for Mobile */}
                <button
                    className="lg:hidden mt-auto w-full text-left hover:opacity-75 transition-all duration-300 flex items-center justify-start gap-2"
                    onClick={() => setModal(true)}
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* Logout Button for Desktop */}
            <button
                className="hidden lg:flex mt-auto w-full text-left hover:opacity-75 transition-all duration-300 items-center justify-start gap-2"
                onClick={() => setModal(true)}
            >
                <LogOut size={18} /> Logout
            </button>

            {/* Modal */}
            {modal && (
                <Modal handleClick={handleLogout} handleCancel={handleCancel}>
                    <div>Are you sure you want to logout?</div>
                </Modal>
            )}
        </div>
    );
};

export default NavBar;
