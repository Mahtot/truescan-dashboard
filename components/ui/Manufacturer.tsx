const Manufacturer = () => {
    return (
        <section id="manufacturer" className="bg-white text-[#051313] px-6 lg:px-20 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold">For Manufacturers</h2>
                <p className="text-lg text-gray-700">
                    TrueScan provides a secure dashboard where manufacturers can register their products, generate tamper-proof QR codes, and protect their brand from counterfeits.
                </p>
                <p className="text-md text-gray-600">
                    Ensure trust, transparency, and traceability in your supply chain with just a few clicks.
                </p>

                {/* CTA Button */}
                <a
                    href="https://truescan-dashboard.vercel.app/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="bg-[#051313] text-white px-8 py-3 rounded-lg hover:opacity-80 transition">
                        Access Dashboard
                    </button>
                </a>
            </div>
        </section>
    );
};

export default Manufacturer;
