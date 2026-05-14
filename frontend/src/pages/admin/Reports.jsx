import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReports } from "../../services/adminService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import {
  ArrowLeft,
  BarChart3,
  ClipboardList,
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  Layers3,
  MapPin,
  TrendingUp,
  Building2,
} from "lucide-react";

const Reports = () => {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
      console.log("REPORT API RESPONSE:", data);
      setReport(data);
    } catch (error) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Helmet>
          <title>Reports | SCMS</title>
        </Helmet>
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-slate-600 font-semibold animate-pulse">
            Loading Reports...
          </p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-slate-700 font-semibold">No Report Data Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-8 py-8">
      <Helmet>
        <title>Reports | SCMS</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-blue-700" />
              Smart Analytics Report
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Smart reporting with trends, problem areas, and performance insights.
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {/* Total */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                {report.total}
              </h2>
            </div>
            <ClipboardList className="text-blue-600" size={28} />
          </div>

          {/* Pending */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                {report.pending}
              </h2>
            </div>
            <Clock className="text-yellow-500" size={28} />
          </div>

          {/* In Progress */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                In Progress
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                {report.inProgress}
              </h2>
            </div>
            <Loader2 className="text-indigo-600" size={28} />
          </div>

          {/* Resolved */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Resolved
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                {report.resolved}
              </h2>
            </div>
            <CheckCircle2 className="text-green-600" size={28} />
          </div>

          {/* Rejected */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Rejected
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                {report.rejected}
              </h2>
            </div>
            <XCircle className="text-rose-600" size={28} />
          </div>
        </div>

        {/* Smart Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {/* Most Problematic Category */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <TrendingUp size={18} />
              Most Problematic Category
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-3">
              {report.mostProblematicCategory || "N/A"}
            </h2>
          </div>

          {/* Most Problematic Location */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <MapPin size={18} />
              Most Problematic Location
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-3">
              {report.mostProblematicLocation || "N/A"}
            </h2>
          </div>

          {/* Avg Resolution Time */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Clock size={18} />
              Avg Resolution Time
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-3">
              {report.avgResolutionHours > 0
                ? `${report.avgResolutionHours} hrs`
                : "N/A"}
            </h2>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Layers3 className="text-blue-700" />
            <h2 className="text-xl font-extrabold text-slate-900">
              Category Breakdown
            </h2>
          </div>

          {report.categoryStats ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Total Complaints</th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(report.categoryStats).map(([key, value]) => (
                    <tr
                      key={key}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-5 py-4 font-bold text-slate-900">
                        {key}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <p className="text-slate-500 font-semibold">
                No category stats available.
              </p>
            </div>
          )}
        </div>

        {/* Department Performance */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="text-blue-700" />
            <h2 className="text-xl font-extrabold text-slate-900">
              Department Performance
            </h2>
          </div>

          {report.departmentPerformance?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4">Department</th>
                    <th className="px-5 py-4">Total Complaints</th>
                  </tr>
                </thead>

                <tbody>
                  {report.departmentPerformance.map((dept, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-5 py-4 font-bold text-slate-900">
                        {dept._id || "Not Assigned"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {dept.totalComplaints}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <p className="text-slate-500 font-semibold">
                No department performance data available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;