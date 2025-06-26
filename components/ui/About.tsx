const About = () => {
    return (
        <section id="about" className="bg-white text-[#051313] px-6 lg:px-20 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold">About TrueScan</h2>
                <p className="text-lg text-gray-700">
                    TrueScan is a blockchain-powered solution designed to detect counterfeit products and protect consumers from dangerous fakes.
                    By allowing users to verify the authenticity of products through secure QR code scans, TrueScan helps reduce health risks and
                    financial losses across Africa.
                </p>
                <p className="text-md text-gray-600">
                    Our mission is to empower individuals, manufacturers, and regulators with a trusted digital tool that restores confidence in
                    the products we use every day—from medicine to cosmetics and beyond.
                </p>
            </div>
        </section>
    );
};

export default About;
