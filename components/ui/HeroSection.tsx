'use client';

import Image from 'next/image';
import Link from 'next/link';
import heroImage from '@/public/hero-image.png'; // replace with your actual image

const HeroSection = () => {
    return (
        <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-20 bg-[#f7f8fa]">

            {/* Left Text Section */}
            <div className="flex-1 text-center lg:text-left space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-[#051313] leading-tight">
                    Verify Products. <br /> Protect Lives.
                </h1>
                <p className="text-lg text-gray-700 max-w-xl">
                    TrueScan is a blockchain-powered mobile solution that helps consumers in Africa instantly verify the authenticity of products using secure QR codes.
                </p>

                {/* CTA Buttons */}
                <div className="flex justify-center lg:justify-start gap-4">
                    {/* <Link href="/demo">
                        <button className="bg-[#051313] text-white px-6 py-3 rounded-lg hover:opacity-80 transition">
                            Try the Demo
                        </button>
                    </Link> */}
                    <Link href="#contact">
                        <button className="bg-[#051313] text-white px-6 py-3 rounded-lg hover:opacity-80 transition">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="flex-1 mb-10 lg:mb-0">
                <Image
                    src={heroImage}
                    alt="TrueScan in action"
                    className="w-full h-auto object-contain"
                    priority
                />
            </div>
        </section>
    );
};

export default HeroSection;
