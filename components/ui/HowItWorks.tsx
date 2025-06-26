const HowItWorks = () => {
    return (
        <section id="how" className="bg-[#f7f8fa] text-[#051313] px-6 lg:px-20 py-16">
            <div className="max-w-5xl mx-auto text-center space-y-10">
                <h2 className="text-3xl lg:text-4xl font-bold">How It Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                    {/* Step 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">1. Manufacturer Registers Product</h3>
                        <p className="text-gray-700">
                            Manufacturers add their products to the TrueScan system using the secure dashboard. Each product is recorded immutably on the blockchain and gets a unique QR code.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">2. QR Code is Printed on Product</h3>
                        <p className="text-gray-700">
                            A secure, unguessable QR code is generated for every registered product and printed on the packaging. This code links directly to the blockchain record.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">3. Consumer Scans the QR Code</h3>
                        <p className="text-gray-700">
                            Consumers scan the QR code using the TrueScan mobile app to instantly verify if the product is genuine, fake, or tampered with.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">4. Instant Feedback</h3>
                        <p className="text-gray-700">
                            The app displays verification results in real time, helping users make safe and confident purchase decisions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
