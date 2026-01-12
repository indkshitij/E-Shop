import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi";
import CTA from "../molecules/CTA";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home | E-Shop";
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* hero */}
      <section className="container mx-auto px-6 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 text-sm font-medium text-gray-600 bg-gray-200 px-4 py-1 rounded-full">
            Trusted by thousands of customers
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Shop Smarter with <span className="text-black">E-Shop</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10">
            Premium products, secure payments, and lightning-fast delivery —
            everything you need in one place.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/products"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 active:scale-95 transition duration-200"
            >
              Browse Products
            </a>

            <a
              href="/register"
              className="border border-black text-black px-8 py-3 rounded-md hover:bg-black hover:text-white active:scale-95 transition duration-200"
            >
              Create Account
            </a>
          </div>
        </div>
      </section>

      {/* fetaures*/}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition group">
            <HiOutlineSparkles className="w-10 h-10 text-black mb-4 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Carefully selected products that meet the highest quality
              standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition group">
            <HiOutlineTruck className="w-10 h-10 text-black mb-4 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Reliable and quick shipping, straight to your doorstep.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition group">
            <HiOutlineShieldCheck className="w-10 h-10 text-black mb-4 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure Payments
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your transactions are protected with industry-grade security.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </div>
  );
};

export default HomePage;
