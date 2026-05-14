// frontend/src/pages/admin/AdminComplaintDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComplaintHistory } from "../../services/complaintService";
import {
  getComplaintByIdAdmin,
  updateComplaintAdmin,
} from "../../services/adminService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Tag,
  ClipboardList,
  Clock,
  Building2,
  Save,
  History,
  Image as ImageIcon,
} from "lucide-react";

const statusBadge = (status) => {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border";

  switch (status) {
    case "Pending":
      return `${base} bg-yellow-50 text-yellow-700 border-yellow-200`;
    case "In Progress":
      return `${base} bg-blue-50 text-blue-700 border-blue-200`;
    case "Resolved":
      return `${base} bg-green-50 text-green-700 border-green-200`;
    case "Rejected":
      return `${base} bg-rose-50 text-rose-700 border-rose-200`;
    default:
      return `${base} bg-slate-100 text-slate-700 border-slate-200`;
  }
};

const AdminComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [history, setHistory] = useState([]);

  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [remark, setRemark] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchComplaint = async () => {
    try {
      setLoading(true);

      const complaintData = await getComplaintByIdAdmin(id);
      setComplaint(complaintData);

      setStatus(complaintData.status);
      setDepartment(complaintData.department || "");

      const historyData = await getComplaintHistory(id);
      setHistory(historyData);
    } catch (error) {
      toast.error("Failed to load complaint details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateComplaintAdmin(id, {
        status,
        department,
        remarks: remark,
      });

      toast.success("Complaint updated successfully");
      setRemark("");
      fetchComplaint();
    } catch (error) {
      toast.error("Failed to update complaint");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Helmet>
          <title>Complaint Details | SCMS</title>
        </Helmet>
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-slate-600 font-semibold animate-pulse">
            Loading complaint details...
          </p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-slate-700 font-semibold">Complaint not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <ClipboardList className="text-blue-700" />
              Complaint Details
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              View complaint info, update status, assign department, and review
              history.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-sm transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>

        {/* Complaint Summary Card */}
        <div
          className={`rounded-2xl shadow-sm p-6 mb-8 border ${complaint.isOverdue
              ? "bg-rose-50 border-rose-300"
              : "bg-white border-slate-200"
            }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Complaint ID
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {complaint.complaintId}
              </h2>
              {complaint.isDuplicate && complaint.duplicateOf && (
                <p className="mt-2 text-sm font-bold text-rose-600">
                  Duplicate Of Complaint ID: {complaint.duplicateOf.complaintId}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">
                Current Status:
              </span>
              <span className={statusBadge(complaint.status)}>
                {complaint.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                User Details
              </p>

              <div className="space-y-2 text-sm text-slate-700">
                <p className="flex items-center gap-2">
                  <User size={16} className="text-slate-500" />
                  <span className="font-semibold">Name:</span>{" "}
                  {complaint.user?.name}
                </p>

                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-slate-500" />
                  <span className="font-semibold">Email:</span>{" "}
                  {complaint.user?.email}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Complaint Info
              </p>

              <div className="space-y-2 text-sm text-slate-700">
                <p className="flex items-center gap-2">
                  <Tag size={16} className="text-slate-500" />
                  <span className="font-semibold">Category:</span>{" "}
                  {complaint.category}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-slate-500" />
                  <span className="font-semibold">Location:</span>{" "}
                  {complaint.location}
                </p>

                <p className="flex items-center gap-2">
                  <Building2 size={16} className="text-slate-500" />
                  <span className="font-semibold">Department:</span>{" "}
                  {complaint.department || "Not Assigned"}
                </p>

                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-500" />
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(complaint.createdAt).toLocaleString()}
                </p>

                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-500" />
                  <span className="font-semibold">Deadline:</span>{" "}
                  {complaint.deadlineAt
                    ? new Date(complaint.deadlineAt).toLocaleString()
                    : "N/A"}
                </p>

                <p className="flex items-center gap-2">
                  <span className="font-semibold">SLA Status:</span>{" "}
                  {complaint.isOverdue ? (
                    <span className="text-rose-600 font-bold">Overdue</span>
                  ) : (
                    <span className="text-green-600 font-bold">On Time</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Complaint Description
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm leading-relaxed">
              {complaint.description}
            </div>
          </div>

          {/* Image */}
          {complaint.image && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <ImageIcon size={16} />
                Uploaded Image
              </p>
              <img
                src={`https://smartcomplaintsystem-h2u5.onrender.com/${complaint.image}`}
                alt="Complaint"
                className="w-full max-w-xl rounded-2xl border border-slate-200 shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Update Complaint */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">
            Update Complaint
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Assign department, change status, and add remark for this complaint.
          </p>

          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Department */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
              >
                <option value="">Select Department</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="IT">IT</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Remark */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Remark
              </label>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Write admin remark..."
                rows="4"
                className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none text-sm"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98] disabled:opacity-60"
              >
                <Save size={18} />
                {saving ? "Updating..." : "Update Complaint"}
              </button>
            </div>
          </form>
        </div>

        {/* Complaint History */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-2 flex items-center gap-2">
            <History className="text-blue-700" />
            Complaint History
          </h2>

          <p className="text-sm text-slate-500 mb-6">
            Track all changes made by admin and system.
          </p>

          {history.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <p className="text-slate-500 font-semibold">No history found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((h) => (
                <div
                  key={h._id}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <span className={statusBadge(h.status)}>{h.status}</span>

                    <p className="text-xs text-slate-500 font-semibold">
                      Updated By: {h.changedBy?.name || "Admin"} |{" "}
                      {new Date(h.changedAt).toLocaleString()}
                    </p>
                  </div>

                  <p className="text-sm text-slate-700 mt-3">
                    <span className="font-semibold text-slate-800">
                      Remark:
                    </span>{" "}
                    {h.remark || "No remark"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetails;