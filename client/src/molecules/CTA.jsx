import React from "react";

const CTA = () => {
  return (
    <div>
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-gray-300 mb-8">
            Join E-Shop today and experience a better way to shop online.
          </p>

          <a
            href="/products"
            className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 active:scale-95 transition duration-200"
          >
            Start Shopping
          </a>
        </div>
      </section>
    </div>
  );
};

export default CTA;
