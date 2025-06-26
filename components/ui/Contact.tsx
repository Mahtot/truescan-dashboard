const Contact = () => {
    return (
        <section id="contact" className="bg-[#f7f8fa] text-[#051313] px-6 lg:px-20 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold">Contact Us</h2>
                <p className="text-lg text-gray-700">
                    Have questions, want to collaborate, or interested in joining our pilot? Reach out through the form below.
                </p>

                <div className="mt-8">
                    <iframe
                        src="https://form.typeform.com/to/kgcJxQsD"
                        width="100%"
                        height="500"
                        frameBorder="0"
                        title="Contact Form"
                        allow="camera; microphone; autoplay; encrypted-media;"
                    ></iframe>
                </div>

            </div>
        </section>
    );
};

export default Contact;
