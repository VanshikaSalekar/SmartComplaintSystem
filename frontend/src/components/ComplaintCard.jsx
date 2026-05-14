// frontend/src/components/ComplaintCard.jsx

import { Link } from "react-router-dom";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-300",
  Resolved: "bg-green-100 text-green-700 border-green-300",
  Rejected: "bg-red-100 text-red-700 border-red-300",
};

const ComplaintCard = ({ complaint }) => {
  return (
    <div
      className={`shadow-md rounded-lg p-5 border hover:shadow-lg transition ${complaint.isOverdue
        ? "bg-red-50 border-red-300"
        : "bg-white border-gray-200"
        }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {complaint.complaintId}
          </h2>
          <p className="text-sm text-gray-500">{complaint.category}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[complaint.status] || "bg-gray-100 text-gray-700"
              }`}
          >
            {complaint.status}
          </span>

          <span
            className={`text-[11px] font-bold px-3 py-1 rounded-full border ${complaint.priority === "High"
              ? "bg-red-100 text-red-700 border-red-300"
              : complaint.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                : "bg-green-100 text-green-700 border-green-300"
              }`}
          >
            {complaint.priority || "Low"} Priority
          </span>

          <span
            className={`text-[11px] font-bold px-3 py-1 rounded-full border ${complaint.isOverdue
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-green-100 text-green-700 border-green-300"
              }`}
          >
            {complaint.isOverdue ? "Overdue" : "On Time"}
          </span>
        </div>
      </div>

      <p className="text-gray-700 text-sm mt-3 line-clamp-2">
        {complaint.description}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        📍 <span className="font-medium">{complaint.location}</span>
      </p>

      <p className="text-xs text-gray-500 mt-1">
        ⏳ Deadline:{" "}
        {complaint.deadlineAt
          ? new Date(complaint.deadlineAt).toLocaleDateString()
          : "N/A"}
      </p>

      <div className="flex justify-between items-center mt-4">
        <p className="text-xs text-gray-400">
          {new Date(complaint.createdAt).toLocaleDateString()}
        </p>

        <Link
          to={`/complaint/${complaint._id}`}
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ComplaintCard;