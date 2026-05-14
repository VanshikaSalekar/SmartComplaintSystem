// frontend/src/pages/user/ComplaintDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getComplaintById,
  getComplaintHistory,
} from "../../services/complaintService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import {
  ArrowLeft,
  ClipboardList,
  MapPin,
  Tag,
  Building2,
  Clock,
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

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaintDetails = async () => {
    try {
      setLoading(true);

      const complaintData = await getComplaintById(id);
      setComplaint(complaintData);

      const historyData = await getComplaintHistory(id);
      setHistory(historyData);
    } catch (error) {
      toast.error("Failed to load complaint details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintDetails();
  }, [id]);

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
              View your complaint information, admin updates, and full history.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-sm transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>

        {/* Complaint Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Complaint ID
              </p>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {complaint.complaintId}
              </h2>
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

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
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
                  <Tag size={16} className="text-slate-500" />
                  <span className="font-semibold">Priority:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${complaint.priority === "High"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : complaint.priority === "Medium"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-green-50 text-green-700 border-green-200"
                      }`}>
                    {complaint.priority || "Low"}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-500" />
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(complaint.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Description
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {complaint.description}
              </p>
            </div>
          </div>

          {/* Admin Remark */}
          {complaint.remarks && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Admin Remark
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
                {complaint.remarks}
              </div>
            </div>
          )}

          {/* Proof Image */}
          {complaint.image && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <ImageIcon size={16} />
                Uploaded Proof Image
              </p>

              <img
                src={`http://localhost:5000/${complaint.image}`}
                alt="Complaint"
                className="w-full max-w-xl rounded-2xl border border-slate-200 shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Complaint History */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-2">
            <History className="text-blue-700" />
            Complaint History
          </h2>

          <p className="text-sm text-slate-500 mb-6">
            Track every update made to your complaint.
          </p>

          {history.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <p className="text-slate-500 font-semibold">
                No history found yet.
              </p>
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

export default ComplaintDetails;