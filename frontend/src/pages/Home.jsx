// frontend/src/pages/Home.jsx

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  ShieldCheck,
  ClipboardList,
  Clock,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>SCMS | Smart Complaint Management System</title>
      </Helmet>

      {/* Hero */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Why Choose SCMS?
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            A smart complaint management platform designed for colleges, hostels,
            and public institutions to improve transparency and speed up issue
            resolution.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-sm rounded-2xl p-7 border border-slate-200 hover:shadow-md transition">
              <ClipboardList className="text-blue-700 mb-4" size={34} />
              <h3 className="text-xl font-extrabold text-slate-900">
                Complaint Tracking
              </h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Track your complaint through Pending, In Progress, Resolved and
                Rejected statuses with full transparency.
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-2xl p-7 border border-slate-200 hover:shadow-md transition">
              <Clock className="text-indigo-700 mb-4" size={34} />
              <h3 className="text-xl font-extrabold text-slate-900">
                Quick Complaint Filing
              </h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Submit complaints with category, description, location and image
                proof in just a few clicks.
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-2xl p-7 border border-slate-200 hover:shadow-md transition">
              <ShieldCheck className="text-green-700 mb-4" size={34} />
              <h3 className="text-xl font-extrabold text-slate-900">
                Admin Management
              </h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                Admin can assign complaints to departments, update status, add
                remarks, and maintain complaint history logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            How It Works
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Simple process designed for students and admins.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Register",
                desc: "Create your account in seconds.",
              },
              {
                step: "2",
                title: "Submit Complaint",
                desc: "Choose category, add description & location.",
              },
              {
                step: "3",
                title: "Track Status",
                desc: "Get updates and view complaint history.",
              },
              {
                step: "4",
                title: "Resolved",
                desc: "Admin resolves and closes complaint quickly.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition text-left"
              >
                <p className="text-blue-700 font-extrabold text-lg">
                  Step {item.step}
                </p>
                <h3 className="mt-2 font-extrabold text-slate-900 text-lg">
                  {item.title}
                </h3>
                <p className="text-sm mt-2 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Ready to Raise a Complaint?
        </h2>
        <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
          Join the Smart Complaint Management System and experience faster issue
          reporting and resolution.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-blue-700 font-bold hover:bg-slate-100 transition shadow-sm"
          >
            Register Now <ArrowRight size={18} />
          </Link>

          <Link
            to="/login"
            className="px-7 py-3 rounded-xl border border-white font-bold hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-300 text-center text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              © {new Date().getFullYear()} Smart Complaint Management System
            </p>

            <p className="flex items-center gap-2 text-slate-400">
              <BarChart3 size={16} />
              MERN Stack Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}