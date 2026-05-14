// frontend/src/pages/admin/AdminDashboard.jsx

import { useEffect, useState } from "react";
import ComplaintTable from "../../components/ComplaintTable";
import { getAllComplaints } from "../../services/adminService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import {
  ClipboardList,
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  RotateCcw,
} from "lucide-react";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const data = await getAllComplaints({ status, category, fromDate, toDate });
      setComplaints(data);
    } catch (error) {
      toast.error("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchComplaints();
  };

  const handleReset = () => {
    setStatus("");
    setCategory("");
    setFromDate("");
    setToDate("");
    setSearchTerm("");
    fetchComplaints();
  };

  // KPI Stats
  const total = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === "Pending").length;
  const inProgressCount = complaints.filter((c) => c.status === "In Progress").length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;
  const rejectedCount = complaints.filter((c) => c.status === "Rejected").length;

  // Search Filter
  const filteredComplaints = complaints.filter((c) => {
    const search = searchTerm.toLowerCase();

    return (
      c.complaintId?.toLowerCase().includes(search) ||
      c.description?.toLowerCase().includes(search) ||
      c.category?.toLowerCase().includes(search) ||
      c.status?.toLowerCase().includes(search) ||
      c.department?.toLowerCase().includes(search) ||
      c.location?.toLowerCase().includes(search) ||
      c.user?.name?.toLowerCase().includes(search) ||
      c.user?.email?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-8 py-8">
      <Helmet>
        <title>Admin Dashboard | SCMS</title>
      </Helmet>
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Monitor complaints, filter records, and manage complaint progress.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total
            </p>
            <h2 className="text-2xl font-bold text-slate-900">{total}</h2>
          </div>
          <ClipboardList className="text-blue-600" size={26} />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending
            </p>
            <h2 className="text-2xl font-bold text-slate-900">{pendingCount}</h2>
          </div>
          <Clock className="text-yellow-500" size={26} />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              In Progress
            </p>
            <h2 className="text-2xl font-bold text-slate-900">{inProgressCount}</h2>
          </div>
          <Loader2 className="text-indigo-600" size={26} />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Resolved
            </p>
            <h2 className="text-2xl font-bold text-slate-900">{resolvedCount}</h2>
          </div>
          <CheckCircle2 className="text-green-600" size={26} />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Rejected
            </p>
            <h2 className="text-2xl font-bold text-slate-900">{rejectedCount}</h2>
          </div>
          <XCircle className="text-rose-600" size={26} />
        </div>
      </div>

      {/* Filters + Search */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
          <Filter size={18} className="text-blue-600" />
          Complaint Filters
        </div>

        <form
          onSubmit={handleFilter}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
        >
          {/* Status Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Category Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
            >
              <option value="">All Categories</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Internet">Internet</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Date Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              From
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              To
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
            />
          </div>

          {/* Search */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Search
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Complaint ID, user, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none px-2 w-full text-sm text-slate-700"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 md:col-span-6">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
            >
              <Filter size={18} />
              Apply Filter
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-2.5 px-5 rounded-xl transition active:scale-[0.98]"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Table Container */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="h-64 flex items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="animate-pulse text-slate-400 font-semibold">
              Loading complaints...
            </div>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 text-center">
            <ClipboardList size={45} className="text-slate-300 mb-3" />
            <h2 className="text-lg font-bold text-slate-700">
              No complaints found
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Try adjusting filters or search keyword.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <ComplaintTable complaints={filteredComplaints} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;