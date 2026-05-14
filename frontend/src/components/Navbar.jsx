// frontend/src/components/Navbar.jsx

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.webp";
import { toast } from "react-toastify";

import {
  LayoutDashboard,
  FilePlus2,
  ShieldCheck,
  BarChart3,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const navLinkStyle =
    "flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-xl bg-white p-1 shadow border border-slate-200"
          />
          <div className="leading-tight">
            <h1 className="text-lg font-extrabold text-slate-900 tracking-wide">
              SCMS
            </h1>
            <p className="text-xs text-slate-500">
              Smart Complaint System
            </p>
          </div>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className={navLinkStyle}>
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-blue-700 text-white shadow-sm hover:bg-blue-800 transition"
              >
                <UserPlus size={18} />
                Register
              </Link>
            </>
          ) : (
            <>
              {user.role === "admin" ? (
                <>
                  <Link to="/admin/dashboard" className={navLinkStyle}>
                    <ShieldCheck size={18} />
                    Admin Dashboard
                  </Link>

                  <Link to="/admin/reports" className={navLinkStyle}>
                    <BarChart3 size={18} />
                    Reports
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className={navLinkStyle}>
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <Link to="/create-complaint" className={navLinkStyle}>
                    <FilePlus2 size={18} />
                    Create Complaint
                  </Link>
                </>
              )}

              {/* Divider */}
              <div className="h-7 w-px bg-slate-200 mx-3" />

              {/* User Badge */}
              <span className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                {user.name}{" "}
                <span className="text-blue-700 font-bold">({user.role})</span>
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;