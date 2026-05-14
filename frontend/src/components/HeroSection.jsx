// frontend/src/components/HeroSection.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";

export default function HeroSection() {
  const slides = [
    {
      title: "Smart Complaint Management System",
      subtitle:
        "Register complaints easily and track them in real-time with transparency and efficiency.",
      image: hero1,
    },
    {
      title: "Track Status Updates Live",
      subtitle:
        "Know whether your complaint is Pending, In Progress, Resolved, or Rejected anytime.",
      image: hero2,
    },
    {
      title: "Admin Panel for Fast Resolution",
      subtitle:
        "Admins can assign departments, update complaint status, add remarks, and generate reports.",
      image: hero3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${slides[currentIndex].image})`,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div
        key={currentIndex}
        className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center text-center fade-in"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white zoom-in">
          {slides[currentIndex].title}
        </h1>

        <p className="mt-5 max-w-2xl text-base md:text-lg text-slate-200 leading-relaxed slide-in-left">
          {slides[currentIndex].subtitle}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="pulse-glow px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Register Complaint
          </Link>

          <Link
            to="/login"
            className="pulse-glow px-6 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>

        {/* Extra Info */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white backdrop-blur-md">
            <h3 className="font-bold text-lg">Easy Complaint Filing</h3>
            <p className="text-sm mt-2 text-slate-200">
              Submit issues with category, location, description, and image proof.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white backdrop-blur-md">
            <h3 className="font-bold text-lg">Transparent Tracking</h3>
            <p className="text-sm mt-2 text-slate-200">
              Track complaint status updates with full history logs.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-5 text-white backdrop-blur-md">
            <h3 className="font-bold text-lg">Admin Resolution System</h3>
            <p className="text-sm mt-2 text-slate-200">
              Admin can manage complaints, assign departments, and generate reports.
            </p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === index
                ? "bg-indigo-500 scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}