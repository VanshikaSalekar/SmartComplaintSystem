// frontend/src/components/ComplaintTable.jsx

import { Link } from "react-router-dom";
import { Eye, User, Tag, Building2, Calendar } from "lucide-react";

const getStatusBadge = (status) => {
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

const ComplaintTable = ({ complaints }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm text-left">
        {/* Table Header */}
        <thead className="bg-slate-50 text-slate-600 uppercase text-xs border-b border-slate-200">
          <tr>
            <th className="px-5 py-4">Complaint ID</th>
            <th className="px-5 py-4">
              <div className="flex items-center gap-2">
                <User size={15} />
                User
              </div>
            </th>
            <th className="px-5 py-4">
              <div className="flex items-center gap-2">
                <Tag size={15} />
                Category
              </div>
            </th>
            <th className="px-5 py-4">
              <div className="flex items-center gap-2">
                <Building2 size={15} />
                Department
              </div>
            </th>
            <th className="px-5 py-4">Status</th>
            <th className="px-4 py-3">SLA</th>
            <th className="px-4 py-3">Duplicate</th>
            <th className="px-5 py-4">
              <div className="flex items-center gap-2">
                <Calendar size={15} />
                Date
              </div>
            </th>
            <th className="px-5 py-4 text-center">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {complaints?.length > 0 ? (
            complaints.map((c) => (
              <tr
                key={c._id}
                className={`border-b border-slate-100 transition ${c.isOverdue ? "bg-rose-50 hover:bg-rose-100" : "hover:bg-slate-50"
                  }`}
              >
                <td className="px-5 py-4 font-bold text-slate-900">
                  {c.complaintId}
                </td>

                <td className="px-5 py-4 text-slate-700 font-medium">
                  {c.user?.name || "Unknown"}
                  <p className="text-xs text-slate-400">
                    {c.user?.email || ""}
                  </p>
                </td>

                <td className="px-5 py-4 text-slate-700 font-medium">
                  {c.category}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {c.department || (
                    <span className="text-slate-400 italic">Not Assigned</span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span className={getStatusBadge(c.status)}>{c.status}</span>
                </td>

                <td className="px-4 py-3 text-sm">
                  {c.isOverdue ? (
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold">
                      Overdue
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold">
                      On Time
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-sm">
                  {c.isDuplicate && c.duplicateOf ? (
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
                      Duplicate Of: {c.duplicateOf.complaintId}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold">
                      Unique
                    </span>
                  )}
                </td>

                <td className="px-5 py-4 text-slate-500 font-medium">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 text-center">
                  <Link
                    to={`/admin/complaint/${c._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
                  >
                    <Eye size={16} />
                    Manage
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-10 text-slate-500">
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;