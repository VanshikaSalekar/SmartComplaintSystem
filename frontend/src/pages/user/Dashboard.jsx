// frontend/src/pages/user/Dashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComplaintCard from "../../components/ComplaintCard";
import { getMyComplaints } from "../../services/complaintService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import {
  ClipboardList,
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
} from "lucide-react";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const data = await getMyComplaints();
      setComplaints(data);
    } catch (error) {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Stats
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const rejected = complaints.filter((c) => c.status === "Rejected").length;

  // Search filter
  const filteredComplaints = complaints.filter((c) => {
    const search = searchTerm.toLowerCase();

    return (
      c.complaintId?.toLowerCase().includes(search) ||
      c.description?.toLowerCase().includes(search) ||
      c.category?.toLowerCase().includes(search) ||
      c.status?.toLowerCase().includes(search) ||
      c.location?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-8 py-8">
      <Helmet>
        <title>Student Dashboard | SCMS</title>
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              My Complaints
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Track your complaints, view status updates, and manage issues
              easily.
            </p>
          </div>

          <Link
            to="/create-complaint"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
          >
            <Plus size={18} />
            Create Complaint
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total
              </p>
              <h2 className="text-2xl font-bold text-slate-900">{total}</h2>
            </div>
            <ClipboardList className="text-blue-600" size={28} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending
              </p>
              <h2 className="text-2xl font-bold text-slate-900">{pending}</h2>
            </div>
            <Clock className="text-yellow-500" size={28} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                In Progress
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                {inProgress}
              </h2>
            </div>
            <Loader2 className="text-indigo-600" size={28} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Resolved
              </p>
              <h2 className="text-2xl font-bold text-slate-900">{resolved}</h2>
            </div>
            <CheckCircle2 className="text-green-600" size={28} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Rejected
              </p>
              <h2 className="text-2xl font-bold text-slate-900">{rejected}</h2>
            </div>
            <XCircle className="text-rose-600" size={28} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Search Complaints
          </label>

          <div className="mt-2 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search by Complaint ID, category, status, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none px-2 w-full text-sm text-slate-700"
            />
          </div>
        </div>

        {/* Complaints */}
        {loading ? (
          <div className="h-64 flex items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="animate-pulse text-slate-400 font-semibold">
              Loading complaints...
            </div>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="text-center bg-white border border-slate-200 shadow-sm rounded-2xl p-10">
            <ClipboardList size={50} className="mx-auto text-slate-300 mb-3" />
            <h2 className="text-xl font-extrabold text-slate-800">
              No complaints found
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Try searching different keywords or create a new complaint.
            </p>

            <Link
              to="/create-complaint"
              className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition"
            >
              <Plus size={18} />
              Create Complaint
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;