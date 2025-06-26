'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/public/logo.png";

// Type for Nav Item
type NavItem = {
    name: string;
    to: string;
};

interface HeaderProps {
    items: NavItem[];
}

const Header = ({ items }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <header className="bg-[#051313] text-white w-full fixed top-0 left-0 z-50 px-5 py-4 flex items-center justify-between shadow-md">

            {/* Logo */}
            <div className="flex items-center gap-3">
                <Image src={logo} alt="Logo" className="w-[120px]" />
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden z-50">
                {isMenuOpen ? (
                    <X onClick={() => setIsMenuOpen(false)} className="cursor-pointer" />
                ) : (
                    <Menu onClick={() => setIsMenuOpen(true)} className="cursor-pointer" />
                )}
            </div>

            {/* Navigation Links */}
            <nav
                className={`${isMenuOpen
                    ? "flex flex-col gap-6 fixed top-0 right-0 bg-[#051313] h-full w-2/3 px-8 py-20 z-40"
                    : "hidden"
                    } lg:flex lg:static lg:flex-row lg:items-center lg:gap-6`}
            >
                {items.map((item) => (
                    <Link
                        key={item.to}
                        href={`#${item.to}`}
                        className="hover:opacity-75 transition-all duration-300 text-lg font-medium"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
