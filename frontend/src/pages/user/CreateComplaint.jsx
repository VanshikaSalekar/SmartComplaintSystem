// frontend/src/pages/user/CreateComplaint.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComplaint } from "../../services/complaintService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

import { ArrowLeft, UploadCloud, Send } from "lucide-react";

const CreateComplaint = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("location", formData.location);

      if (image) {
        data.append("image", image);
      }

      await createComplaint(data);

      toast.success("Complaint submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 md:px-8 py-10">
      <Helmet>
        <title>Create Complaint | SCMS</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Create Complaint
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Submit a complaint with category, description, and proof image.
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-sm transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Complaint Category
              </label>

              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select Category</option>
                <option value="Water">Water Problem</option>
                <option value="Electricity">Electricity Issue</option>
                <option value="Internet">Internet Issue</option>
                <option value="Cleanliness">Cleanliness Issue</option>
                <option value="Maintenance">Maintenance Fault</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Department will be automatically assigned based on category.
              </p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Location
              </label>

              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Example: Hostel A, Room 203"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Complaint Description
              </label>

              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain your issue clearly..."
                rows="5"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Upload Proof Image (Optional)
              </label>

              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                <UploadCloud size={20} className="text-slate-500" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-700 transition"
                />
              </div>

              {image && (
                <p className="text-xs text-slate-500 mt-1">
                  Selected File:{" "}
                  <span className="font-semibold text-slate-700">
                    {image.name}
                  </span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-sm hover:shadow-md transition active:scale-[0.98]"
            >
              <Send size={18} />
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateComplaint;